import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateSeller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
  } catch (error) {}
};
