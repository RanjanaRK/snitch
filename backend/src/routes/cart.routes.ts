import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../contollers/cart.controller.js";
import { getCallSites } from "node:util";

const cartRouter = Router();

cartRouter.post(
  "/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateRole(["buyer"]), getCart);

export default cartRouter;
