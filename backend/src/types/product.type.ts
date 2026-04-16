export interface CreateProductInput {
    name: string;
    description: string;
    brand: string;
    category: string;
    basePrice?: number;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
}

export interface UpdateProductInput {
    name?: string;
    description?: string;
    brand?: string;
    basePrice?: number;
    category?: string;
    images?: {
        url: string;
        thumbnailUrl: string;
    }[];
    isActive?: boolean;
}