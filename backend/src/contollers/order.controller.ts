import type { Request, Response } from "express";
import type { JwtUser } from "../utils/types.js";
import paymentModel from "../model/payment.model.js";

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtUser;

    const orders = await paymentModel
      .find({ user: user.id, status: "paid" })
      .populate("orderItems.productId")
      .populate("orderItems.variantId");

    return res
      .status(200)
      .json({ message: "Orders fetched successfully", success: true, orders });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getSingleOrdersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { orderId } = req.params;

    const order = await paymentModel
      .findById(orderId)
      .populate("orderItems.productId")
      .populate("orderItems.variantId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ message: "Order fetched successfully", success: true, order });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
