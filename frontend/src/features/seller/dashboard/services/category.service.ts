import api from "../../../../lib/api/axios";
import type { ICategory } from "../types/seller.type";

export const categoryService = {
    async getCategories() {
        const response = await api.get("/category");
        return response.data;
    },

    async getCategory(id: string) {
        const response = await api.get(`/category/${id}`);
        return response.data;
    },

    async createCategory(data: Partial<ICategory>) {
        const response = await api.post("/category", data);
        return response.data;
    },

    async updateCategory(id: string, data: Partial<ICategory>) {
        const response = await api.put(`/category/${id}`, data);
        return response.data;
    },

    async deleteCategory(id: string) {
        const response = await api.delete(`/category/${id}`);
        return response.data;
    }
};
