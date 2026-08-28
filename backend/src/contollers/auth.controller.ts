import type { Request, Response } from "express";
import userModel, { type IUser } from "../model/user.model.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../config/env.js";
import type { GoogleUser, JwtUser } from "../utils/types.js";
import { sendEmail } from "../service/mail.service.js";

async function sendTokenResponse(
  user: IUser,
  res: Response,
  message: string,
): Promise<void> {
  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role,
    },
    success: true,
    message,
  });
}

export const register = async (req: Request, res: Response) => {
  const { email, password, fullname, contact, isSeller } = req.body;
  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
      });
    }

    const user = await userModel.create({
      email,
      password,
      fullname,
      emailVerified: false,
      contact,
      role: isSeller ? "seller" : "buyer",
    });

    // await sendTokenResponse(user, res, "User registered successfully");

    const emailVerificationToken = jwt.sign(
      { email: user.email },
      env.EMAIL_VERIFICATION_TOKEN,
    );

    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      html: `<p>Hi ${user.fullname},</p>
             <p>Thank you for registering at <strong>Vestra</strong>.</p>
             <p>Please verify your email address by clicking below:</p>

             <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}">
               Verify Email
             </a>
             <p>If you did not create an account, please ignore this email.</p>
             <p>Best regards,<br>The Vestra Team</p>`,
    });

    res.status(200).json({
      success: true,
      message:
        "User registered successfully. Please check your email for verification.",
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        message: "Please verify your email before logging in",
      });
    }
    await sendTokenResponse(user, res, "User logged in successfully");
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const userData = req.user as GoogleUser;

    const { id, displayName, emails } = userData;

    const email = emails?.[0]?.value;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not found",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        googleId: id,
        fullname: displayName,
      });
    }

    const token = jwt.sign(
      { _id: user?._id, role: user?.role },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173");
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    const decoded = jwt.verify(
      token,
      env.EMAIL_VERIFICATION_TOKEN,
    ) as JwtPayload;

    if (!decoded) {
      throw new Error("Invalid email verification token");
    }

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.emailVerified) {
      throw new Error("Email already verified");
    }

    user.emailVerified = true;

    await user.save();

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as JwtUser;

    if (!currentUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await userModel.findById(currentUser.id).select("-password");

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
