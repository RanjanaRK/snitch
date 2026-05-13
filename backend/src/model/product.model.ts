import mongoose from "mongoose";
import priceSchema from "./price.model.js";
import variantSchema from "./variant.model.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: {
      type: priceSchema,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    variants: [variantSchema],
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
