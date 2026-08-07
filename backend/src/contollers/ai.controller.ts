import type { Request, Response } from "express";

export const recommendOutfitController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { prompt, budget, occasion } = req.body;

    const file = req.file;

    console.log(file);
    console.log(prompt);
    console.log(occasion);
    console.log(budget);

    return res.status(200).json({
      success: true,
      message: "Data received successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
