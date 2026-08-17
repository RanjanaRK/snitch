import productModel from "../model/product.model.js";

export const getProductsForRecommendation = async (
  categoryIds: string[],
  budget: number,
) => {
  return productModel
    .find({
      category: { $in: categoryIds },
      "price.amount": { $lte: budget },
    })
    .populate("category");
};
