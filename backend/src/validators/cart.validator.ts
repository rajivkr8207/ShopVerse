import { body, param } from "express-validator";
import { validateRequest } from "../config/validate.js";


export const addToCartValidator = [
    body("productId")
        .notEmpty().withMessage("Product required")
        .isMongoId().withMessage("Invalid productId"),

    body("variantId")
        .optional()
        .isMongoId().withMessage("Invalid variantId"),

    body("quantity")
        .notEmpty()
        .isInt({ min: 1 }).withMessage("Quantity must be >= 1"),

    validateRequest
];

export const updateCartValidator = [
    param("id").isMongoId().withMessage("Invalid cart id"),

    body("quantity")
        .notEmpty()
        .isInt({ min: 1 }).withMessage("Quantity must be >= 1"),
    validateRequest
];

export const deleteCartValidator = [
    param("id").isMongoId().withMessage("Invalid cart id"),
    validateRequest
];