import express from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  createReviewController,
  deleteReviewController,
  getProductReviewsController,
  updateReviewController,
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

reviewRouter.post(
  "/products/:productId/ai-review-summary",
  authenticateRole(["buyer"]),
  getProductReviewsController,
);
export default reviewRouter;
