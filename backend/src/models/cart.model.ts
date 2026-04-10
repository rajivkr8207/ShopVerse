import mongoose, { Schema } from "mongoose";
import type { ICartItem } from "../types/cart.type.js";

const cartSchema = new Schema<ICartItem>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        variantId: {
            type: Schema.Types.ObjectId,
            ref: "ProductVariant",
        },

        size: {
            type: String,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
    }, { timestamps: true }
);

export const Cart = mongoose.model<ICartItem>("Cart", cartSchema);
