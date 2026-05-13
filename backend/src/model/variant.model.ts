import mongoose from "mongoose";
import sizeSchema from "./size.model.js";
import priceSchema from "./price.model.js";

const variantSchema = new mongoose.Schema(
  {
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    color: {
      type: String,
      required: true,
    },

    sizes: [sizeSchema],

    price: {
      type: priceSchema,
    },
  },
  { _id: false, _v: false },
);

export default variantSchema;
