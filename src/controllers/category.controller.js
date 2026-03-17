import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
} from "../services/category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
    const category = await createCategoryService({
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, category, "Category created successfully"));
});


export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await getAllCategoriesService();

    return res
        .status(200)
        .json(new ApiResponse(200, categories));
});


export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await getCategoryByIdService(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(200, category));
});


export const updateCategory = asyncHandler(async (req, res) => {
    const category = await updateCategoryService({
        id: req.params.id,
        userId: req.user.id,
        ...req.body,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, category, "Category updated successfully"));
});


export const deleteCategory = asyncHandler(async (req, res) => {
    await deleteCategoryService({
        id: req.params.id,
        userId: req.user.id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Category deleted successfully"));
});