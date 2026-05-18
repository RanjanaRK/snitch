import { Router } from "express";
import { addToCart, getCart } from "../contollers/cart.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateRole(["buyer"]), getCart);

export default cartRouter;
