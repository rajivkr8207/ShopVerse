import { body } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { validateRequest } from "../config/validate.js";

// Middleware to check validation results

export const registerValidator = [
    body("fullname").trim().notEmpty().withMessage("Fullname is required"),
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("contact").trim().notEmpty().withMessage("Contact is required"),
    body("role")
        .optional()
        .isIn(["admin", "seller", "buyer"])
        .withMessage("Role must be 'admin', 'seller', or 'buyer'"),
    validateRequest
];

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    validateRequest
];
