import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

export const createCategoryService = async ({ name, description, userId }) => {
    if (!name) {
        throw new ApiError(400, "Category name is required");
    }

    const existing = await Category.findOne({
        name: new RegExp(`^${name}$`, "i"),
    });

    if (existing) {
        throw new ApiError(400, "Category already exists");
    }

    const category = await Category.create({
        name,
        description,
        userId,
    });

    return category;
};


export const getAllCategoriesService = async () => {
    return await Category.find({ isActive: true });
};


export const getCategoryByIdService = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return category;
};


export const updateCategoryService = async ({
    id,
    userId,
    name,
    description,
    isActive,
}) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (category.userId.toString() !== userId) {
        throw new ApiError(403, "Not allowed to update this category");
    }

    if (name) {
        const existing = await Category.findOne({
            name: new RegExp(`^${name}$`, "i"),
            _id: { $ne: id },
        });

        if (existing) {
            throw new ApiError(400, "Category name already in use");
        }

        category.name = name;
    }

    if (description !== undefined) {
        category.description = description;
    }

    if (isActive !== undefined) {
        category.isActive = isActive;
    }

    await category.save();

    return category;
};


export const deleteCategoryService = async ({ id, userId }) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (category.userId.toString() !== userId) {
        throw new ApiError(403, "Not allowed to delete this category");
    }

    category.isActive = false;
    await category.save();

    return true;
};