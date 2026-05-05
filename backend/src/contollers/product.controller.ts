import type { Request, Response } from "express";
import productModel from "../model/product.model.js";
import { uploadImage } from "../service/storage.service.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    if (!seller) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const files = req.files as Express.Multer.File[];
    const images = await Promise.all(
      files.map(async (file) => {
        return await uploadImage({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR",
      },
      images,
      seller: seller.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
