import { categoryModel } from "../model/category.model.js";

export const getCategoriesForAI = async () => {
  return await categoryModel
    .find(
      {},
      {
        _id: 1,
        name: 1,
        parentCategory: 1,
      },
    )
    .lean();
};
