import type { Request, Response } from "express";
import productModel from "../model/product.model.js";
import cartModel from "../model/cart.model.js";
import type { JwtUser } from "../utils/types.js";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;
    const user = req.user as JwtUser;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const stock = product.variants.find(
      (variant) => variant._id.toString() === variantId,
    )?.stock;

    const cart =
      (await cartModel.findOne({
        user: user.id,
      })) || (await cartModel.create({ user: user.id }));
  } catch (error) {}
};
