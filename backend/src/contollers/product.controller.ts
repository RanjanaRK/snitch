import type { Request, Response } from "express";
import productModel from "../model/product.model.js";
import { uploadImage } from "../service/storage.service.js";
import type { JwtUser } from "../utils/types.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;

    const seller = req.user as JwtUser;

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
        amount: Number(priceAmount),
        currency: priceCurrency || "INR",
      },
      images,
      seller: seller.id,
    });

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getSellerProducts = async (req: Request, res: Response) => {
  try {
    const seller = req.user as JwtUser;

    if (!seller) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const products = await productModel.find({ seller: seller.id });

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let filter: any = {};

    if (category) {
      filter.category = category;
    }
    console.log(filter, "filter");
    console.log(category, "category");

    const products = await productModel.find(filter).populate("category");

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const addProductVariant = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const seller = req.user as JwtUser;
    const product = await productModel.findOne({
      _id: productId,
      seller: seller.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const files = req.files as Express.Multer.File[];
    const images: any[] = [];
    if (files && files.length !== 0) {
      (
        await Promise.all(
          files.map(async (file) => {
            const image = await uploadImage({
              buffer: file.buffer,
              fileName: file.originalname,
            });
            return image;
          }),
        )
      ).map((image) => images.push(image));
    }

    const price = req.body.priceAmount;
    const stock = req.body.stock;
    const attributes = JSON.parse(req.body.attributes || "{}");

    console.log(price);

    product.variants.push({
      images,
      price: {
        amount: Number(price) || product.price.amount,
        currency: req.body.priceCurrency || product.price.currency,
      },
      stock,
      attributes,
    });

    await product.save();

    return res.status(200).json({
      message: "Product variant added successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding product variant" });
  }
};
