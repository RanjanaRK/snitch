import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = Router();

productRouter.post(
  "/",
  authenticateRole(["seller"]),
  upload.array("images", 7),
  createProduct,
);

export default productRouter;
