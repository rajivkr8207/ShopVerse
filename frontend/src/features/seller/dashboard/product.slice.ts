import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "./types/seller.type";

interface ProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
            state.loading = false;
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) state.products[index] = action.payload;
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(p => p._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setProducts, addProduct, updateProduct, removeProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
