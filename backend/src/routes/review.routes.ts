import express from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  createReviewController,
  deleteReviewController,
  getProductReviewsController,
} from "../contollers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/create/:productId",
  authenticateRole(["buyer"]),
  createReviewController,
);

reviewRouter.get(
  "/:productId",
  authenticateRole(["buyer"]),
  getProductReviewsController,
);

reviewRouter.delete(
  "/delete/:reviewId",
  authenticateRole(["buyer"]),
  deleteReviewController,
);

reviewRouter.patch(
  "/update/:reviewId",
  authenticateRole(["buyer"]),
  updateReviewController,
);

export default reviewRouter;
