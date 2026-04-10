import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CategoryService } from "../services/category.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, slug, description } = req.body;

    if (!name || !slug || !description) {
        throw new ApiError(400, "All fields are required");
    }

    const existing = await CategoryService.getCategoryBySlug(slug);
    if (existing) {
        throw new ApiError(400, "Category already exists");
    }

    const category = await CategoryService.createCategory({
        name,
        slug,
        description
    });

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
});

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();

    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await CategoryService.getCategoryById(id as string);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, category, "Category fetched successfully")
    );
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await CategoryService.updateCategory(id as string, req.body);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, category, "Category updated successfully")
    );
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await CategoryService.deleteCategory(id as string);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Category deleted successfully")
    );
});