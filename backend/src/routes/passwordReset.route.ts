import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordReset.controllers.js";
import { forgotPasswordValidator, resetPasswordValidator } from "../validators/passwordReset.validator.js";

const PasswordResetRouter = Router();

PasswordResetRouter.post("/forgot", forgotPasswordValidator, forgotPassword);
PasswordResetRouter.post("/reset", resetPasswordValidator, resetPassword);

export default PasswordResetRouter;
