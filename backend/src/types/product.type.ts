export interface CreateProductInput {
    name: string;
    description: string;
    brand: string;
    price: number;
    discountPrice?: number;
    category: string;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
}

export interface UpdateProductInput {
    name?: string;
    description?: string;
    brand?: string;
    price?: number;
    discountPrice?: number;
    category?: string;
    images?: {
        url: string;
        thumbnailUrl: string;
    }[];
    isActive?: boolean;
}