import mongoose from "mongoose";

const aiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      default: "",
    },
    occasion: {
      type: String,
    },

    budget: {
      type: Number,
    },

    aiAnalysis: {
      category: String,
      style: String,
      preferredColor: [String],
      skinTone: String,
      explanation: String,
    },
    recommendedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("AIHistory", aiHistorySchema);
