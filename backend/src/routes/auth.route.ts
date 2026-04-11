import { Router } from "express";
import { register, login, getMe, logout, verifyEmail, googleCallback } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
import passport from "passport";

const AuthRouter = Router();

// /api/auth/google
AuthRouter.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] }))

AuthRouter.get("/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
)
AuthRouter.post("/register", registerValidator, register);
AuthRouter.post("/verify-email", verifyEmail);
AuthRouter.post("/login", loginValidator, login);
AuthRouter.get("/profile", protect, getMe);
AuthRouter.get("/logout", protect, logout);

export default AuthRouter;
