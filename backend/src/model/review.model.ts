import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewComment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export const reviewModel = mongoose.model("review", reviewSchema);
