import type { Request, Response } from "express";
import { categoryModel } from "../model/category.model.js";
import slugify from "slugify";

export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find({
      parentCategory: null,
    });

    return res.status(200).json({
      success: true,
      message: "category fetched",
      categories,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export const addCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, parentCategory } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const categories = await categoryModel.create({
      name,
      slug,
      parentCategory: parentCategory || null,
    });

    return res.status(200).json({
      success: true,
      message: "Category added",
      categories,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error" });
  }
};

export const getSubCatgeoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { parentId } = req.params as { parentId: string };

    const subCategories = await categoryModel.find({
      parentCategory: parentId,
    });

    return res.status(200).json({
      success: true,
      message: "Subcategory fetched",
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
