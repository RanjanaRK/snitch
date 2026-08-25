import express from "express";
import {
  createReviewController,
  deleteReviewController,
  getProductReviewsController,
  getReviewSummaryController,
  regenerateReviewSummaryController,
  updateReviewController,
} from "../contollers/review.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

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

reviewRouter.post(
  "/:productId/ai-review-summary",
  authenticateRole(["buyer"]),
  regenerateReviewSummaryController,
);

reviewRouter.get(
  "/ai-review-summary/:productId",
  authenticateRole(["seller"]),
  getReviewSummaryController,
);

export default reviewRouter;
