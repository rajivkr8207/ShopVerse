import { body } from "express-validator";
import { validate } from "../config/validate.js";

export const registerValidator = [

    body("fullname")
        .notEmpty()
        .withMessage("Fullname is required")
        .isLength({ min: 3 })
        .withMessage("Fullname must be at least 3 characters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone must be 10 digits"),
    validate

];


export const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    validate

];
