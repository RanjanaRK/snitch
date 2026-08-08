import type { Request, Response } from "express";
import { uploadImage } from "../service/storage.service.js";

export const recommendOutfitController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { prompt, budget, occasion } = req.body;

    const file = req.file as Express.Multer.File;

    console.log(file);
    console.log(prompt);
    console.log(occasion);
    console.log(budget);

    const uploadedPhoto = await uploadImage({
      folder: "ai-fashion",
      buffer: file?.buffer,
      fileName: file?.originalname,
    });

    return res.status(200).json({
      success: true,
      message: "Data received successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
