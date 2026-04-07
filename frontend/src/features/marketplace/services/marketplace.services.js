import api from "../../../lib/api/axios";

export const marketplaceService = {
    /**
     * Fetch all products with optional filters
     */
    getProducts: async (params = {}) => {
        return await api.get("/products", { params });
    },
    getCartApi: async () => {
        const res = await api.get('/cart')
        return res.data
    },
    addToCartapi: async (productId, quantity) => {
        return await api.post("/cart", { productId, quantity });
    },
    /**
     * Fetch a single product by ID
     */
    getProductById: async (id) => {
        return await api.get(`/products/${id}`);
    },

    /**
     * Fetch categories for filtering
     */
    getCategories: async () => {
        return await api.get("/products/categories");
    },

    /**
     * Search products
     */
    searchProducts: async (query) => {
        return await api.get(`/products/search?q=${query}`);
    }
};
