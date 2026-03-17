import express from "express";
import { forgotPasswordRequest, getProfile, getme, loginUser, logoutUser, registerUser, resetPassword, verifyUser } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authrouter = express.Router();

authrouter.post("/register", registerValidator, registerUser);
authrouter.post("/login",loginValidator, loginUser);
authrouter.get("/verify/:token", verifyUser);
authrouter.get("/profile",isAuthenticated, getProfile);
authrouter.get("/logout",logoutUser);
authrouter.get("/get-me",isAuthenticated, getme);
authrouter.post("/forgot-password", forgotPasswordRequest);
authrouter.post("/reset-password/:token", resetPassword);

export default authrouter;