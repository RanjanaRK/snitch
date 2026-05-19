import { Router } from "express";
import {
  addToCart,
  getCart,
  increamentCartItemQuantity,
} from "../contollers/cart.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  validateAddToCart,
  validateCartIncreamentQuantity,
} from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateRole(["buyer"]), getCart);

cartRouter.patch(
  "/quantity/increament/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateCartIncreamentQuantity,
  increamentCartItemQuantity,
);

export default cartRouter;
