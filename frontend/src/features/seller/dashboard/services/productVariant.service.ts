import api from "../../../../lib/api/axios";
import type { IProductVariant } from "../types/seller.type";

export const productVariantService = {
    async getVariants() {
        const response = await api.get("/product-variant");
        return response.data;
    },

    async getVariant(id: string) {
        const response = await api.get(`/product-variant/${id}`);
        return response.data;
    },

    async createVariant(data: FormData | Partial<IProductVariant>) {
        const headers = data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
        const response = await api.post("/product-variant", data, { headers });
        return response.data;
    },

    async updateVariant(id: string, data: FormData | Partial<IProductVariant>) {
        const headers = data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
        const response = await api.put(`/product-variant/${id}`, data, { headers });
        return response.data;
    },

    async deleteVariant(id: string) {
        const response = await api.delete(`/product-variant/${id}`);
        return response.data;
    }
};
