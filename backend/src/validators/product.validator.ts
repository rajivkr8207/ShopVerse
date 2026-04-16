import { body } from "express-validator";
import { validateRequest } from "../config/validate.js";

export const createProductValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 chars"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 5 }).withMessage("Description too short"),

    body("brand")
        .notEmpty().withMessage("Brand is required"),

    body("category")
        .notEmpty().withMessage("Category is required")
        .isMongoId().withMessage("Invalid category ID"),
    body("basePrice")
        .notEmpty().withMessage("Base price is required")
        .isNumeric().withMessage("Base price must be a number"),
    validateRequest
];


// ✅ UPDATE PRODUCT VALIDATOR
export const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }),
    body("description")
        .optional()
        .isLength({ min: 5 }),

    body("brand")
        .optional(),
    body("category")
        .optional()
        .isMongoId().withMessage("Invalid category ID"),
    body("basePrice")
        .optional()
        .isNumeric().withMessage("Base price must be a number"),
    body("isActive")
        .optional()
        .isBoolean(),
    validateRequest
];