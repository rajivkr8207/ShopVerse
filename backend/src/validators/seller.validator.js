import { body } from "express-validator";
import { validate } from "../config/validate.js";

export const sellerRegisterValidator = [

    body("fullname")
        .notEmpty().withMessage("Fullname is required"),

    body("email")
        .isEmail().withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("phone")
        .isLength({ min: 10, max: 10 }).withMessage("Phone must be 10 digits"),

    body("shopName")
        .notEmpty().withMessage("Shop name is required"),

    body("shopAddress")
        .notEmpty().withMessage("Shop address is required"),

    body("gstNumber")
        .notEmpty().withMessage("gst number is required"),

    body("shopDescription")
        .notEmpty().withMessage("Shop description is required"),

    validate
];