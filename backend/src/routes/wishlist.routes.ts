import { Router } from "express";
import { authenticateRole } from "../middlewares/auth.middleware.js";

const likeRoute = Router();

likeRoute.post("/", authenticateRole(["buyer"]));

export default likeRoute;
