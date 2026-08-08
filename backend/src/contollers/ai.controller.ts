import type { Request, Response } from "express";
import { uploadImage } from "../service/storage.service.js";
import { analyzeFashionImage } from "../service/ai.service.js";
import { categoryModel } from "../model/category.model.js";
import { getCategoriesForAI } from "../dao/category.dao.js";

export const recommendOutfitController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { prompt, occasion, budget } = req.body;

    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: "file is required" });
    }

    console.log(file);
    console.log(prompt);
    console.log(occasion);
    console.log(budget);

    const categories = await getCategoriesForAI();

    const aiCategories = categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
    }));
    const uploadedPhoto = await uploadImage({
      folder: "ai-fashion",
      buffer: file?.buffer,
      fileName: file?.originalname,
    });
    console.log("ImageKit response:", uploadedPhoto);

    const aiResult = await analyzeFashionImage({
      imageBuffer: file.buffer,
      mimeType: file.mimetype,
      prompt,
      occasion,
      budget: Number(budget),
      categories: aiCategories,
    });

    console.log("AI result:", aiResult);

    return res.status(200).json({
      success: true,
      message: "Data received successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
