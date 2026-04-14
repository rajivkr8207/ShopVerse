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
    price: number;
    discountPrice?: number;
    category: ICategory | string;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    isActive: boolean;
    createdAt: string;
}

export interface IProductVariant {
    _id: string;
    productId: string | IProduct;
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    stock: number;
    price?: number;
    sku: string;
}

export type SidebarState = {
    isOpen: boolean;
};