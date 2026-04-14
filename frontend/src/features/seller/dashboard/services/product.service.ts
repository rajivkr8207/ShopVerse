import api from "../../../../lib/api/axios";

export const productService = {
    async getProducts() {
        const response = await api.get("/product");
        return response.data;
    },

    async getProduct(id: string) {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },

    async createProduct(formData: FormData) {
        // Use multipart/form-data for image upload
        const response = await api.post("/product", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    async updateProduct(id: string, data: any) {
        // If updating without images, can use regular JSON
        const response = await api.put(`/product/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: string) {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    }
};
