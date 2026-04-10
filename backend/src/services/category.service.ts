import { Category } from "../models/Category.model.js";
import type { ICategory, CreateCategoryInput } from "../types/category.type.js";


type CategoryServiceType = {
    createCategory(data: CreateCategoryInput): Promise<ICategory>;
    getAllCategories(): Promise<ICategory[]>;
    getCategoryById(id: string): Promise<ICategory | null>;
    getCategoryBySlug(slug: string): Promise<ICategory | null>;
    updateCategory(id: string, data: Partial<CreateCategoryInput>): Promise<ICategory | null>;
    deleteCategory(id: string): Promise<ICategory | null>;
};

const CategoryService: CategoryServiceType = {
    async createCategory(data: CreateCategoryInput) {
        return await Category.create(data);
    },

    async getAllCategories() {
        return await Category.find();
    },

    async getCategoryById(id: string) {
        return await Category.findById(id);
    },

    async getCategoryBySlug(slug: string) {
        return await Category.findOne({ slug });
    },

    async updateCategory(id: string, data: Partial<CreateCategoryInput>) {
        return await Category.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    },

    async deleteCategory(id: string) {
        return await Category.findByIdAndDelete(id);
    }
};
export { CategoryService }