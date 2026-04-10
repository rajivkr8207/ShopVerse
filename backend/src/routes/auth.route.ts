import { Router } from "express";
import { register, login, getMe, logout, verifyEmail } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerValidator, register);
AuthRouter.post("/verify-email", verifyEmail);
AuthRouter.post("/login", loginValidator, login);
AuthRouter.get("/profile", protect, getMe);
AuthRouter.get("/getme", protect, getMe);
AuthRouter.get("/logout", protect, logout);

export default AuthRouter;
