import { Router } from "express";
import {
  getMe,
  googleAuthCallback,
  login,
  logout,
  register,
} from "../contollers/auth.controller.js";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import passport from "passport";
import env from "../config/env.js";
import { authenticateRole } from "../middlewares/auth.middleware.js";

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
    failureRedirect:
      env.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login",
  }),
  googleAuthCallback,
);

authRouter.get("/me", authenticateRole(["seller", "buyer"]), getMe);

authRouter.post("/logout", authenticateRole(["seller", "buyer"]), logout);

export default authRouter;
