import express from "express";
import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";

const CategoryRouter = express.Router();

CategoryRouter.post("/", protect, isSeller, createCategory);
CategoryRouter.put("/:id", protect, isSeller, updateCategory);
CategoryRouter.delete("/:id", protect, isSeller, deleteCategory);
CategoryRouter.get("/", getCategories);
CategoryRouter.get("/:id", getCategory);

export default CategoryRouter;