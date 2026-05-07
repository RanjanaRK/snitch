import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  createProduct,
  getProductById,
  getSellerProducts,
} from "../contollers/product.controller.js";

const productRouter = Router();

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */

productRouter.post(
  "/",
  authenticateRole(["seller"]),
  upload.array("images", 7),
  createProduct,
);

/**
 * @route GET /api/products/seller
 * @description Get products of the authenticated seller
 * @access Private (Seller only)
 */

productRouter.get("/seller", authenticateRole(["seller"]), getSellerProducts);

/**
 * @route GET /api/products/:id
 * @description Get a product by its ID
 * @access Public
 */

productRouter.get("/detail/:id", getProductById);

export default productRouter;
