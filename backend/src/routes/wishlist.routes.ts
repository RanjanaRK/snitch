import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "../contollers/wishlist.controller.js";

const likeRoute = Router();

likeRoute.post(
  "/create/:productId/:variantId",
  authenticateRole(["buyer"]),
  createWishlist,
);

likeRoute.patch(
  "/remove/:productId/:variantId",
  authenticateRole(["buyer"]),
  deleteWishlist,
);

likeRoute.post("/", authenticateRole(["buyer"]), getWishlist);

export default likeRoute;
