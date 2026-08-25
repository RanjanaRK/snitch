import mongoose from "mongoose";

const reviewSummarySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      unique: true,
    },

    summary: {
      type: String,
      required: true,
    },
    pros: {
      type: [String],
      required: true,
    },
    cons: {
      type: [String],
      required: true,
    },
    generatedFromReviewCount: {
      type: Number,
      required: true,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const reviewSummaryModel = mongoose.model(
  "reviewSummary",
  reviewSummarySchema,
);
