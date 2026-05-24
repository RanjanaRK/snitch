import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";
import {
  createWishlist,
  getWishlist,
} from "../contollers/wishlist.controller.js";

const likeRoute = Router();

likeRoute.post(
  "/create/:productId/:variantId",
  authenticateRole(["buyer"]),
  createWishlist,
);

likeRoute.post("/", authenticateRole(["buyer"]), getWishlist);

export default likeRoute;
