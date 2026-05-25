import type { Request, Response } from "express";
import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";
import type { JwtUser } from "../utils/types.js";
import mongoose from "mongoose";
import { createOrder } from "../service/payment.service.js";
import paymentModel from "../model/payment.model.js";

const getCartDetails = async (userId: string) => {
  let cart = await cartModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "items.product",
      },
    },
    {
      $unwind: {
        path: "$items.product",
      },
    },
    {
      $unwind: {
        path: "$items.product.variants",
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$items.variant", "$items.product.variants._id"],
        },
      },
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              "$items.quantity",
              "$items.product.variants.price.amount",
            ],
          },
          currency: "$items.product.variants.price.currency",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        totalPrice: {
          $sum: "$itemPrice.price",
        },
        currency: {
          $first: "$itemPrice.currency",
        },
        items: {
          $push: "$items",
        },
      },
    },
  ]);

  return cart[0];
};

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

    // const cart = await cartModel
    //   .findOne({ user: user.id })
    //   .populate("items.product");

    // const cart = await cartModel.aggregate([
    //   {
    //     $match: {
    //       user: new mongoose.Types.ObjectId(user.id),
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$items",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "items.product",
    //       foreignField: "_id",
    //       as: "items.product",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$items.product",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$items.product.variants",
    //     },
    //   },
    //   {
    //     $match: {
    //       $expr: {
    //         $eq: ["$items.variant", "$items.product.variants._id"],
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       itemPrice: {
    //         price: {
    //           $multiply: [
    //             "$items.quantity",
    //             "$items.product.variants.price.amount",
    //           ],
    //         },
    //         currency: "$items.product.variants.price.currency",
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       totalPrice: {
    //         $sum: "$itemPrice.price",
    //       },
    //       currency: {
    //         $first: "$itemPrice.currency",
    //       },
    //       items: {
    //         $push: "$items",
    //       },
    //     },
    //   },
    // ]);

    const cart = await getCartDetails(user.id);

    if (!cart) {
      await cartModel.create({ user: user.id });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const increamentCartItemQuantity = async (
  req: Request,
  res: Response,
) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const cart = await cartModel.findOne({
      user: user.id,
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const stock = product.variants.find(
      (variant) => variant._id.toString() === variantId,
    )?.stock;

    if (!stock) {
      return res
        .status(404)
        .json({ message: "Variant not found", success: false });
    }

    const itemQuantityInCart =
      cart?.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant?.toString() === variantId,
      )?.quantity || 0;

    if (itemQuantityInCart + 1 > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: user.id,
        "items.product": productId,
        "items.variant": variantId,
      } as any,
      { $inc: { "items.$.quantity": 1 } },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Cart item quantity incremented successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const decreamentCartItemQuantity = async (
  req: Request,
  res: Response,
) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const cart = await cartModel.findOne({
      user: user.id,
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const stock = product.variants.find(
      (variant) => variant._id.toString() === variantId,
    )?.stock;

    if (!stock) {
      return res
        .status(404)
        .json({ message: "Variant not found", success: false });
    }

    const itemQuantityInCart = cart?.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (!itemQuantityInCart) {
      return res.status(404).json({
        message: "Cart item not found",
        success: false,
      });
    }

    if (itemQuantityInCart.quantity <= 1) {
      await cartModel.findOneAndUpdate(
        { user: user.id },
        {
          $pull: {
            items: {
              product: productId,
              variant: variantId,
            },
          },
        },
      );

      return res.status(200).json({
        message: "Item removed from cart",
        success: true,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: user.id,
        "items.product": productId,
        "items.variant": variantId,
      } as any,
      {
        $inc: {
          "items.$.quantity": -1,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Cart item quantity decremented successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    await cartModel.findOneAndUpdate(
      {
        user: user.id,
        "items.product": productId,
        "items.variant": variantId,
      } as any,
      {
        $pull: {
          items: {
            product: productId,
            variant: variantId,
          },
        },
      },
    );

    return res.status(200).json({
      message: "Cart item deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  const user = req.user as JwtUser;
  try {
    const cart = await getCartDetails(user.id);

    if (!cart) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

    const order = await createOrder({
      amount: cart.totalPrice,
      currency: cart.currency,
    });

    const payment = await paymentModel.create({
      user: user.id,
      payment: {
        orderId: order.id,
      },
      price: {
        amount: cart.totalPrice,
        currency: cart.currency,
      },
      orderItems: cart.items.map((item) => ({
        title: item.product.title,
        productId: item.product._id,
        variantId: item.variant,
        quantity: item.quantity,
        images: item.product.variants.images || item.product.images,
        description: item.product.description,
        price: {
          amount:
            item.product.variants.price.amount || item.product.price.amount,
          currency:
            item.product.variants.price.currency || item.product.price.currency,
        },
      })),
    } as any);

    return res.status(200).json({
      message: "Order created successfully",
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
