import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { recommendOutfitController } from "../contollers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/recommend", upload.single("photo"), recommendOutfitController);

export default aiRouter;
