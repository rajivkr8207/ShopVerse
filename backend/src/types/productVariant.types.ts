export interface CreateVariantInput {
    productId: string;
    size: "S" | "M" | "L" | "XL";
    color: string;
    stock: number;
    price?: number;
    sku: string;
}

export interface UpdateVariantInput {
    size?: "S" | "M" | "L" | "XL";
    color?: string;
    stock?: number;
    price?: number;
    sku?: string;
}