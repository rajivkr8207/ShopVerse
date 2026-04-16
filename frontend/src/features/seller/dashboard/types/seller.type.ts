export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    brand: string;
    category: ICategory | string;
    isActive: boolean;
    createdAt: string;
    basePrice?: number;
    images?: {
        url: string;
        thumbnailUrl: string;
    }[];
}

export interface IProductVariant {
    _id: string;
    productId: string | IProduct;
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    stock: number;
    price?: number;
    discountPrice?: number;
    sku: string;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
}

export type SidebarState = {
    isOpen: boolean;
};