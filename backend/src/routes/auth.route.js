import express from "express";
import { forgotPasswordRequest, getProfile, getme, googleAuthHandler, loginUser, logoutUser, registerUser, resetPassword, verifyUser } from "../controllers/auth.controllers.js";
import passport from "passport";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authrouter = express.Router();

authrouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
authrouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), googleAuthHandler);
authrouter.post("/register", registerValidator, registerUser);
authrouter.post("/login", loginValidator, loginUser);
authrouter.get("/verify/:token", verifyUser);
authrouter.get("/profile", isAuthenticated, getProfile);
authrouter.get("/logout", logoutUser);
authrouter.get("/get-me", isAuthenticated, getme);
authrouter.post("/forgot-password", forgotPasswordRequest);
authrouter.post("/reset-password/:token", resetPassword);

export default authrouter;