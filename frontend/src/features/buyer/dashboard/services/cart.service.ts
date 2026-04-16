import api from "../../../../lib/api/axios";

export const cartService = {
    async getCart() {
        const response = await api.get("/cart");
        return response.data;
    },

    async addToCart(data: { productId: string; variantId?: string; quantity: number }) {
        const response = await api.post("/cart", data);
        return response.data;
    },

    async updateQuantity(cartId: string, quantity: number) {
        const response = await api.put(`/cart/${cartId}`, { quantity });
        return response.data;
    },

    async removeFromCart(cartId: string) {
        const response = await api.delete(`/cart/${cartId}`);
        return response.data;
    },

    async clearCart() {
        const response = await api.delete("/cart/clear");
        return response.data;
    }
};
