import CategoryModel from "../models/catetgory.model.js";
import type { Types } from "mongoose";
import type { ICategory } from "../types/category.type.js";

interface CreateCategoryInput {
    name: string;
    description: string;
    seller: Types.ObjectId;
}

interface UpdateCategoryInput {
    name: string;
    description: string;
}

export interface ICategoryService {
    CreateCategory: (data: CreateCategoryInput) => Promise<ICategory>;
    DeleteCategory: (id: string) => Promise<ICategory | null>;
    updateCategoryById: (id: string, data: UpdateCategoryInput) => Promise<ICategory | null>;
    GetAllCategories: (id: Types.ObjectId) => Promise<ICategory[]>;
    GetCategoryById: (id: string) => Promise<ICategory | null>;
}


export const CategoryService: ICategoryService = {
    CreateCategory: async ({ name, description, seller }: CreateCategoryInput) => {
        try {
            const category = await CategoryModel.create({
                name,
                description,
                seller,
            });
            return category as unknown as ICategory;
        } catch (error) {
            throw error;
        }
    },
    DeleteCategory: async (id: string) => {
        try {
            const category = await CategoryModel.findByIdAndDelete(id);
            return category as unknown as ICategory | null;
        } catch (error) {
            throw error;
        }
    },
    updateCategoryById: async (id: string, data: UpdateCategoryInput) => {
        try {
            const category = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
            return category as unknown as ICategory | null;
        } catch (error) {
            throw error;
        }
    },
    GetAllCategories: async (id: Types.ObjectId) => {
        try {
            const categories = await CategoryModel.find({ seller: id });
            return categories as unknown as ICategory[];
        } catch (error) {
            throw error;
        }
    },
    GetCategoryById: async (id: string) => {
        try {
            const category = await CategoryModel.findById(id);
            return category as unknown as ICategory | null;
        } catch (error) {
            throw error;
        }
    }
}
