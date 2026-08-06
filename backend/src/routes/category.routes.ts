import { Router } from "express";
import {
  addCategoryController,
  getAllSubCategoriesController,
  getCategoryController,
  getSubCatgeoriesController,
} from "../contollers/category.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategoryController);

categoryRouter.post(
  "/add",
  authenticateRole(["seller"]),
  addCategoryController,
);

categoryRouter.post("/subCategories", getAllSubCategoriesController);
categoryRouter.get("/subcategories/:parentId", getSubCatgeoriesController);

export default categoryRouter;
