import { body } from "express-validator";
import { validate } from "../config/validate.js";

export const addressValidator = [
    body("fullName")
        .notEmpty().withMessage("Full name is required"),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone must be 10 digits"),

    body("pincode")
        .notEmpty().withMessage("Pincode is required"),

    body("state")
        .notEmpty().withMessage("State is required"),

    body("city")
        .notEmpty().withMessage("City is required"),

    body("addressLine1")
        .notEmpty().withMessage("Address line1 is required"),
    validate

];