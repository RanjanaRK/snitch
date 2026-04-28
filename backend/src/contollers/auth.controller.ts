import type { Request, Response } from "express";
import userModel, { type IUser } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

interface sendTokenResponseTypes {
  user: IUser;
  res: Response;
  message: string;
}

async function sendTokenResponse({
  user,
  res,
  message,
}: sendTokenResponseTypes) {
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message,
    res,
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role,
    },
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
      contact,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse({
      user,
      res,
      message: "User registered successfully",
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

    await sendTokenResponse({
      user,
      res,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
