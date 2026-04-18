import { body } from "express-validator";
import { validateRequest } from "../config/validate.js";

export const createVariantValidator = [
    body("productId")
        .notEmpty().withMessage("Product ID required")
        .isMongoId().withMessage("Invalid product ID"),

    body("size")
        .notEmpty()
        .isIn(["S", "M", "L", "XL", "XXL"]).withMessage("Invalid size"),

    body("color")
        .notEmpty().withMessage("Color required"),

    body("stock")
        .notEmpty()
        .isInt({ min: 0 }).withMessage("Stock must be >= 0"),

    body("price")
        .optional()
        .isFloat({ min: 0 }).withMessage("Invalid price"),
    body("discountPrice")
        .optional()
        .isFloat({ min: 0 }).withMessage("Invalid discount price"),
    body("sku")
        .notEmpty().withMessage("SKU required")
        .isLength({ min: 3 }).withMessage("SKU too short"),

    validateRequest
];


export const updateVariantValidator = [
    body("size")
        .optional()
        .isIn(["S", "M", "L", "XL"]),

    body("color")
        .optional(),

    body("stock")
        .optional()
        .isInt({ min: 0 }),

    body("price")
        .optional()
        .isFloat({ min: 0 }),
    body("discountPrice")
        .optional()
        .isFloat({ min: 0 }),
    body("sku")
        .optional()
        .isLength({ min: 3 }),
    validateRequest
];