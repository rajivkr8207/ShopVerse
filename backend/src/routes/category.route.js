import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import {
    createCategoryValidator,
    updateCategoryValidator,
    getCategoryValidator
} from "../validators/category.validator.js";
import { isSeller } from "../middlewares/seller.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const Categoryrouter = express.Router();

Categoryrouter.post("/",isAuthenticated, isSeller, createCategoryValidator, createCategory);

Categoryrouter.get("/",isAuthenticated, getAllCategories);

Categoryrouter.get("/:id",isAuthenticated, getCategoryValidator, getCategoryById);

Categoryrouter.put("/:id",isAuthenticated,isSeller, updateCategoryValidator, updateCategory);

Categoryrouter.delete("/:id",isAuthenticated, isSeller, getCategoryValidator, deleteCategory);

export default Categoryrouter;