import { Router } from "express";
import {
  googleAuthCallback,
  login,
  register,
} from "../contollers/auth.controller.js";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, register);

authRouter.post("/login", validateLoginUser, login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleAuthCallback,
);

export default authRouter;
