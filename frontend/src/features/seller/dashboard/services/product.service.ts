import api from "../../../../lib/api/axios";

export const productService = {
    async getProducts() {
        const response = await api.get("/product");
        console.log(response)
        return response.data;
    },

    async getProductById(id: string) {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },

    async createProduct(data: any) {
        const response = await api.post("/product/create", data);
        return response.data;
    },

    async updateProduct(id: string, data: any) {
        const response = await api.put(`/product/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: string) {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    }
};
