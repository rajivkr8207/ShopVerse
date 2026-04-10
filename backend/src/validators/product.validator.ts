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

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0 }).withMessage("Price must be positive"),

    body("discountPrice")
        .optional()
        .isFloat({ min: 0 }).withMessage("Discount must be positive")
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error("Discount price must be less than price");
            }
            return true;
        }),

    body("category")
        .notEmpty().withMessage("Category is required")
        .isMongoId().withMessage("Invalid category ID"),

    body("images")
        .isArray({ min: 1 }).withMessage("At least one image required")
        .custom((images) => {
            if (images.length > 4) {
                throw new Error("Maximum 4 images allowed");
            }
            return true;
        }),

    body("images.*")
        .isURL().withMessage("Each image must be a valid URL"),

    body("stock")
        .notEmpty().withMessage("Stock is required")
        .isInt({ min: 0 }).withMessage("Stock must be positive integer"),
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

    body("price")
        .optional()
        .isFloat({ min: 0 }),

    body("discountPrice")
        .optional()
        .isFloat({ min: 0 })
        .custom((value, { req }) => {
            if (req.body.price && value >= req.body.price) {
                throw new Error("Discount price must be less than price");
            }
            return true;
        }),

    body("category")
        .optional()
        .isMongoId().withMessage("Invalid category ID"),

    body("images")
        .optional()
        .isArray()
        .custom((images) => {
            if (images.length > 4) {
                throw new Error("Maximum 4 images allowed");
            }
            return true;
        }),

    body("images.*")
        .optional()
        .isURL(),

    body("stock")
        .optional()
        .isInt({ min: 0 }),

    body("isActive")
        .optional()
        .isBoolean(),
    validateRequest
];