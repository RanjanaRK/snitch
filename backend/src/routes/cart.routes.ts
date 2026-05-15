import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.post(
  "/:productId/:variantId",
  authenticateRole(["buyer"]),
  validateAddToCart,
);

export default cartRouter;
