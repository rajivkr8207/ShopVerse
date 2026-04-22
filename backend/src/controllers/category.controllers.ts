import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Types } from "mongoose";
import { CategoryService } from "../services/category.service.js";


export const CreateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const user = req.user as any;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!name) {
        return res.status(400).json({
            message: "Name is required",
        });
    }
    const category = await CategoryService.CreateCategory({
        name,
        description,
        seller: new Types.ObjectId(user.id as string),
    });

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
})

export const DeleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (!user || !id) {
        return res.status(400).json({ message: "Unauthorized or Category ID missing" });
    }
    
    const category = await CategoryService.DeleteCategory(id as string);
    if (!category) {
        return res.status(404).json({
            message: "Category not found",
        });
    }
    return res.status(200).json(
        new ApiResponse(200, {}, "Category deleted successfully")
    );
})


export const UpdateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const { name, description } = req.body;
    if (!user || !id) {
        return res.status(400).json({ message: "Unauthorized or Category ID missing" });
    }
    
    const category = await CategoryService.updateCategoryById(id as string, { name, description });
    if (!category) {
        return res.status(404).json({
            message: "Category not found",
        });
    }
    return res.status(200).json(
        new ApiResponse(200, category, "Category updated successfully")
    );
})

export const GetAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as any;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const categories = await CategoryService.GetAllCategories(new Types.ObjectId(user.id as string));
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
})

export const GetCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    if (!user || !id) {
        return res.status(400).json({ message: "Unauthorized or Category ID missing" });
    }
    
    const category = await CategoryService.GetCategoryById(id as string);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(
        new ApiResponse(200, category, "Category fetched successfully")
    );
})
