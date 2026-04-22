import express from "express";
import { CreateCategory, DeleteCategory, GetAllCategories, GetCategoryById, UpdateCategory } from "../controllers/category.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const CategoryRouter = express.Router();


CategoryRouter.get('/', protect, GetAllCategories)
CategoryRouter.get('/:id', protect, GetCategoryById)
CategoryRouter.post('/', protect, CreateCategory)
CategoryRouter.delete('/:id', protect, DeleteCategory)
CategoryRouter.put('/:id', protect, UpdateCategory)

export default CategoryRouter;