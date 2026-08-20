import express from "express";
import {
  getOrdersController,
  getSingleOrdersController,
} from "../contollers/order.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.get("/all", authenticateRole(["buyer"]), getOrdersController);

orderRoute.get(
  "/:orderId",
  authenticateRole(["buyer"]),
  getSingleOrdersController,
);

export default orderRoute;
