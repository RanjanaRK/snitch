import mongoose, { Schema, Types } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "category",
    default: null,
  },
});

export const categoryModel = mongoose.model("category", categorySchema);
