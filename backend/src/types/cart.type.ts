import type { Types } from "mongoose";

export interface ICartItem {
    userId: Types.ObjectId;
    productId: Types.ObjectId;
    variantId?: Types.ObjectId;
    size?: string;
    quantity: number;
    price: number;
}