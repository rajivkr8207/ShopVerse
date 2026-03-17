import { body, param } from "express-validator";
import { validate } from "../config/validate.js";

export const createCategoryValidator = [
    body("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2 })
        .withMessage("Category name must be at least 2 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
        validate
];

export const updateCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category ID"),

    body("name")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be true/false"),
        validate
];

export const getCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category ID"),
        validate
];