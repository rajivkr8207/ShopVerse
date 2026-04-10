type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
};



export type { CartItem, CartState }