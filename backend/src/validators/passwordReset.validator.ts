import { body } from "express-validator";
import { validateRequest } from "../config/validate.js";

export const forgotPasswordValidator = [
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    validateRequest
];

export const resetPasswordValidator = [
    body("token").trim().notEmpty().withMessage("Token is required"),
    body("newPassword")
        .trim()
        .isLength({ min: 6 })
        .withMessage("New Password must be at least 6 characters long"),
    validateRequest
];
