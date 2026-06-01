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

categoryRouter.get("/subcategories/:parentId", getSubCatgeoriesController);

categoryRouter.post(
  "/add",
  authenticateRole(["seller"]),
  addCategoryController,
);

categoryRouter.post("/subCategories", getAllSubCategoriesController);

export default categoryRouter;
