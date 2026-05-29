import { Router } from "express";
import { getCategoryController } from "../contollers/category.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.get(
  "/",
  authenticateRole(["buyer,seller"]),
  getCategoryController,
);

categoryRouter.get("/subcategories/:parentId");

export default categoryRouter;
