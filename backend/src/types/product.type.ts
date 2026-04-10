export interface CreateProductInput {
    name: string;
    description: string;
    brand: string;
    price: number;
    discountPrice?: number;
    category: string;
    images: string[];
    stock: number;
}

export interface UpdateProductInput {
    name?: string;
    description?: string;
    brand?: string;
    price?: number;
    discountPrice?: number;
    category?: string;
    images?: string[];
    stock?: number;
    isActive?: boolean;
}