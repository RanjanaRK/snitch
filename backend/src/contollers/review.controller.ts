import type { Request, Response } from "express";
import productModel from "../model/product.model.js";
import { reviewModel } from "../model/review.model.js";
import type { JwtUser } from "../utils/types.js";
import paymentModel from "../model/payment.model.js";

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params as { productId: string };
    const { rating, reviewComment } = req.body;
    const user = req.user as JwtUser;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const boughtProduct = await paymentModel.findOne({
      user: user.id,
      "products.productId": productId,
    });

    if (!boughtProduct) {
      return res.status(403).json({
        message: "You haven't bought this product",
      });
    }

    const existingReview = await reviewModel.findOne({
      product: productId,
      user: user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    const review = await reviewModel.create({
      user: user.id,
      product: productId,
      rating,
      reviewComment,
    });

    return res.status(201).json({
      success: true,
      message: "Review posted successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProductReviewsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { productId } = req.params as { productId: string };

    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;

    const user = req.user as JwtUser;

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    let reviewByUser = review.user.toString() !== user.id;

    if (reviewByUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await reviewModel.deleteOne({ _id: reviewId });

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { rating, reviewComment } = req.body;

    const user = req.user as JwtUser;

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating;

    review.reviewComment = reviewComment;

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
