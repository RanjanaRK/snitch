import type { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {} = req.body;
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
