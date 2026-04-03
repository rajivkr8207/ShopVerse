import express from "express";
import { registerSeller } from "../controllers/seller.controller.js";
import { sellerRegisterValidator } from "../validators/seller.validator.js";

const sellerRouter = express.Router();

sellerRouter.post("/register", sellerRegisterValidator, registerSeller);
// sellerRouter.post("/login",loginValidator, loginUser);
// sellerRouter.get("/verify/:token", verifyUser);
// sellerRouter.get("/profile",isAuthenticated, getProfile);
// sellerRouter.get("/logout",logoutUser);
// sellerRouter.get("/get-me", getme);
// sellerRouter.post("/forgot-password", forgotPasswordRequest);
// sellerRouter.post("/reset-password/:token", resetPassword);

export default sellerRouter;