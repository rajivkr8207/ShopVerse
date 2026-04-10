import { Cart } from "../models/cart.model.js";
import type { ICartItem } from "../types/cart.type.js";

export const cartService = {
    async addToCart(userId: string, data: Partial<ICartItem>) {
        const existing = await Cart.findOne({
            userId,
            productId: data.productId,
            variantId: data.variantId || null,
        });

        if (existing) {
            existing.quantity += data.quantity!;
            return await existing.save();
        }

        return await Cart.create({
            ...data,
            userId,
        });
    },

    // 🔹 GET USER CART
    async getUserCart(userId: string) {
        return await Cart.find({ userId })
            .populate("productId")
            .populate("variantId");
    },

    // 🔹 UPDATE QUANTITY
    async updateQuantity(id: string, quantity: number) {
        return await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        );
    },

    async removeItem(id: string) {
        return await Cart.findByIdAndDelete(id);
    },

    async clearCart(userId: string) {
        return await Cart.deleteMany({ userId });
    },
};