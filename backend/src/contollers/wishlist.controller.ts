import type { Request, Response } from "express";
import type { JwtUser } from "../utils/types.js";
import productModel from "../model/product.model.js";
import { wishlistModel } from "../model/wishlist.model.js";

export const createWishlist = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlist =
      (await wishlistModel.findOne({ user: user.id })) ||
      (await wishlistModel.create({ user: user.id, items: [] }));

    const alreadyExists = wishlist.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (alreadyExists) {
      wishlist.set(
        "items",
        wishlist.items.filter(
          (item) =>
            item.product.toString() !== productId &&
            item.variant?.toString() !== variantId,
        ),
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
        wishlist,
      });
    }

    wishlist.items.push({ product: productId, variant: variantId });

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtUser;

    const wishItems = await wishlistModel
      .find({ user: user.id })
      .populate("items.product");

    return res.status(200).json({
      success: true,
      message: "fetched wishlist",
      wishlist: wishItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
