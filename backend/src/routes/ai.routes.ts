import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  recommendOutfitController,
  refineOutfitController,
} from "../contollers/ai.controller.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const aiRouter = express.Router();

aiRouter.post(
  "/recommend",
  authenticateRole(["buyer"]),
  upload.single("photo"),
  recommendOutfitController,
);

aiRouter.post("/refine", authenticateRole(["buyer"]), refineOutfitController);

export default aiRouter;
