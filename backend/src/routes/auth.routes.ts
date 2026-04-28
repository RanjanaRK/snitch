import { Router } from "express";
import { register } from "../contollers/auth.controller.js";
import { validateRegisterUser } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, register);

export default authRouter;
