import type { Request, Response } from "express";
import { categoryModel } from "../model/category.model.js";

export const getCategoryController = async (req: Request, res: Response) => {
  try {


    const categories= await categoryModel.find()


  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
