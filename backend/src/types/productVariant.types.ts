export interface CreateVariantInput {
    productId: string;
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    stock: number;
    price: number;
    discountPrice: number;
    sku: string;
}

export interface UpdateVariantInput {
    size?: "S" | "M" | "L" | "XL" | "XXL";
    color?: string;
    stock?: number;
    price?: number;
    discountPrice?: number;
    sku?: string;
}