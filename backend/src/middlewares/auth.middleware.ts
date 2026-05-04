import type { NextFunction, Request, Response } from "express";

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
  } catch (error) {}
};
