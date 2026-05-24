import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product.variants",
      },
    },
  ],
});

export const wishlistModel = mongoose.model("wishlist", wishlistSchema);
