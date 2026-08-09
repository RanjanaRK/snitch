import type { Request, Response } from "express";
import { uploadImage } from "../service/storage.service.js";
import { analyzeFashionImage } from "../service/ai.service.js";
import { categoryModel } from "../model/category.model.js";
import { getCategoriesForAI } from "../dao/category.dao.js";
import productModel from "../model/product.model.js";

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

    const cleanJson = aiResult
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const recommendation = JSON.parse(cleanJson || "{}");

    const categoryIds = recommendation.recommendation.categoryIds;
    const style = recommendation.recommendation.formality;
    const occasions = recommendation.recommendation.occasion;

    const calculateProductScore = (product: any, recommendation: any) => {
      let score = 0;

      const categoryId = product.category?._id?.toString();

      if (recommendation.categoryIds?.some((id: string) => id === categoryId)) {
        score += 40;
      }

      if (
        product.style?.toLowerCase() === recommendation.formality?.toLowerCase()
      ) {
        score += 20;
      }

      // Occasion
      if (
        product.occasions?.some(
          (item: string) =>
            item.toLowerCase() === recommendation.occasion?.toLowerCase(),
        )
      ) {
        score += 15;
      }

      // Keywords
      const productKeywords = (product.keywords || []).map((keyword: string) =>
        keyword.toLowerCase(),
      );

      const aiKeywords = (recommendation.keywords || []).map(
        (keyword: string) => keyword.toLowerCase(),
      );

      const keywordMatches = aiKeywords.filter((keyword: string) =>
        productKeywords.includes(keyword),
      );

      score += Math.min(keywordMatches.length * 5, 25);

      // Color matching
      const productColors = (product.variants || [])
        .map((variant: any) => variant.attributes?.color)
        .filter(Boolean)
        .flatMap((color: string) =>
          color
            .toLowerCase()
            .split(",")
            .map((c) => c.trim()),
        );

      const preferredColors = (recommendation.preferredColors || []).map(
        (color: string) => color.toLowerCase().trim(),
      );

      const colorMatches = preferredColors.filter((preferred: string) =>
        productColors.some(
          (productColor: string) =>
            productColor.includes(preferred) ||
            preferred.includes(productColor),
        ),
      );

      score += Math.min(colorMatches.length * 5, 10);
      return score;
    };

    const products = await productModel
      .find({
        category: { $in: categoryIds },
        "price.amount": { $lte: Number(budget) },
      })
      .populate("category")
      .limit(30);

    const scoredProducts = products
      .map((product) => ({
        product,
        score: calculateProductScore(product, recommendation.recommendation),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      message: "Data received successfully",
      products: scoredProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
