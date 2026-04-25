import type { Types } from "mongoose";

export interface CreateProductInput {
    title: string;
    description: string;
    seller: Types.ObjectId;
    price: {
        amount: number;
        currency: string;
    };
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    brand?: string;
    category?: string | Types.ObjectId;
}


export interface UpdateProductInput {
    title?: string;
    description?: string;
    brand?: string;
    category?: string | Types.ObjectId;
    images?: {
        url: string;
        thumbnailUrl?: string;
    }[];
    isActive?: boolean;
    price?: number;
}