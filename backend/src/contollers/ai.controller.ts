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

    const calculateProductScore = (product: any, recommendation: any) => {
      let score = 0;

      const normalize = (value: string) =>
        value?.toLowerCase().trim().replace(/[-_]/g, " ").replace(/\s+/g, " ");

      // 1. CATEGORY — 30 points

      const productCategoryId = product.category?._id?.toString();

      const categoryMatch = recommendation.categoryIds?.some(
        (id: string) => id === productCategoryId,
      );

      if (categoryMatch) {
        score += 30;
      }

      // 2. STYLE — 15 points

      const productStyle = normalize(product.style);
      const recommendedStyle = normalize(recommendation.formality);

      if (
        productStyle &&
        recommendedStyle &&
        productStyle === recommendedStyle
      ) {
        score += 15;
      }

      // 3. OCCASION — 15 points

      const productOccasions = (product.occasions || []).map(
        (occasion: string) => normalize(occasion),
      );

      const recommendedOccasion = normalize(recommendation.occasion);

      if (productOccasions.includes(recommendedOccasion)) {
        score += 15;
      }

      // 4. COLOR — 20 points

      const productColors = [
        product.color,
        ...(product.variants || []).map(
          (variant: any) => variant.attributes?.color,
        ),
      ]
        .filter(Boolean)
        .flatMap((color: string) =>
          color
            .toLowerCase()
            .split(",")
            .map((c) => normalize(c)),
        );

      const preferredColors = (recommendation.preferredColors || []).map(
        (color: string) => normalize(color),
      );

      let colorScore = 0;

      for (const preferred of preferredColors) {
        const matched = productColors.some((productColor: string) => {
          return (
            productColor === preferred ||
            productColor.includes(preferred) ||
            preferred.includes(productColor)
          );
        });

        if (matched) {
          colorScore += 5;
        }
      }

      score += Math.min(colorScore, 20);

      // 5. KEYWORDS — 20 points

      const productKeywords = (product.keywords || []).map((keyword: string) =>
        normalize(keyword),
      );

      const aiKeywords = (recommendation.keywords || []).map(
        (keyword: string) => normalize(keyword),
      );

      let keywordScore = 0;

      for (const aiKeyword of aiKeywords) {
        const matched = productKeywords.some((productKeyword: string) => {
          return (
            productKeyword === aiKeyword ||
            productKeyword.includes(aiKeyword) ||
            aiKeyword.includes(productKeyword)
          );
        });

        if (matched) {
          keywordScore += 4;
        }
      }

      score += Math.min(keywordScore, 20);

      return score;
    };

    const products = await productModel
      .find({
        category: { $in: categoryIds },
        "price.amount": { $lte: Number(budget) },
      })
      .populate("category");

    const scoredProducts = products
      .map((product) => ({
        product,
        score: calculateProductScore(product, recommendation.recommendation),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      message: "Recommendation generated successfully",
      recommendation: recommendation.recommendation,
      detected: recommendation.detected,
      products: scoredProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
