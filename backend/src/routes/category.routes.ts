import { Router } from "express";
import {
  addCategoryController,
  getCategoryController,
  getSubCatgeoriesController,
} from "../contollers/category.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.get(
  "/",
  authenticateRole(["buyer,seller"]),
  getCategoryController,
);

categoryRouter.get("/subcategories/:parentId", getSubCatgeoriesController);
categoryRouter.post(
  "/add",
  authenticateRole(["seller"]),
  addCategoryController,
);

export default categoryRouter;
