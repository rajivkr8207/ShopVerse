import type { IProduct, IProductVariant } from "../../../seller/dashboard/types/seller.type";

export interface CartItem {
    _id: string;
    userId: string;
    productId: IProduct;
    variantId?: IProductVariant | null;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
    totalQuantity: number;
    totalAmount: number;
}