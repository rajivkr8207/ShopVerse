import type { Types } from "mongoose";

export interface CreateVariantInput {
    productId: Types.ObjectId;
    seller: Types.ObjectId;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    stock: number;
    attributes: Map<string, string>;
    price: {
        amount: number;
        currency: string;
    };
}

export interface UpdateVariantInput {
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    stock: number;
    attributes: Map<string, string>;
    price: {
        amount: number;
        currency: string;
    };
}