import { Router } from "express";
import {
  addToCart,
  createOrderController,
  decreamentCartItemQuantity,
  deleteCartItem,
  getCart,
  increamentCartItemQuantity,
  verifyOrderController,
} from "../contollers/cart.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  validateAddToCart,
  validateCartQuantity,
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
  validateCartQuantity,
  increamentCartItemQuantity,
);

cartRouter.patch(
  "/quantity/decreament/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateCartQuantity,
  decreamentCartItemQuantity,
);

cartRouter.patch(
  "/items/remove/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateCartQuantity,
  deleteCartItem,
);

cartRouter.post(
  "/payment/create/order",
  authenticateRole(["buyer"]),
  createOrderController,
);

cartRouter.post(
  "/payment/verify/order",
  authenticateRole(["buyer"]),
  verifyOrderController,
);

export default cartRouter;
