import type { Request, Response } from "express";

export const getCategoryController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
