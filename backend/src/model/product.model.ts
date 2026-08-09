import mongoose from "mongoose";
import priceSchema from "./price.model.js";

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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    price: {
      type: priceSchema,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    style: {
      type: String,
      enum: ["casual", "formal", "party", "ethnic", "streetwear", "sports"],
    },
    occasions: [
      {
        type: String,
        enum: [
          "interview",
          "office",
          "college",
          "wedding",
          "party",
          "travel",
          "gym",
          "daily",
          "festive",
          "ethnic",
          "casual",
          "birthday",
          "anniversary",
          "christmas",
        ],
      },
    ],
    keywords: {
      type: [String],
      default: [],
    },
    variants: [
      {
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        stock: {
          type: Number,
          default: 0,
        },
        attributes: {
          type: Map,
          of: String,
        },
        price: {
          type: priceSchema,
        },
      },
    ],
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
