import type { Request, Response } from "express";
import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";
import type { JwtUser } from "../utils/types.js";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;

    console.log(productId, variantId, "addToCart Id");

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

    if (!stock) {
      return res
        .status(404)
        .json({ message: "Variant not found", success: false });
    }

    const cart =
      (await cartModel.findOne({
        user: user.id,
      })) || (await cartModel.create({ user: user.id }));

    const isProductAlreadyIncart = cart.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (isProductAlreadyIncart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant?.toString() === variantId,
      )?.quantity;

      if (quantityInCart + quantity > stock) {
        return res
          .status(400)
          .json({ message: "Out of stock", success: false });
      }

      await cartModel.findOneAndUpdate(
        {
          user: user.id,
          "items.product": productId,
          "items.variant": variantId,
        } as any,
        { $inc: { "items.$.quantity": quantity } },
        { new: true },
      );

      return res.status(200).json({
        message: "Cart updated successfully",
        success: true,
      });
    }

    if (quantity > stock) {
      return res
        .status(400)
        .json({ message: `Only ${stock} items left in stock`, success: false });
    }

    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price: product.price,
    });

    await cart.save();
    return res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtUser;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await cartModel
      .findOne({ user: user.id })
      .populate("items.product");

    if (!cart) {
      const newCart = await cartModel.create({ user: user.id });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
