import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProductVariant } from "./types/seller.type";

interface ProductVariantState {
    variants: IProductVariant[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductVariantState = {
    variants: [],
    loading: false,
    error: null,
};

const productVariantSlice = createSlice({
    name: "productVariant",
    initialState,
    reducers: {
        setVariants: (state, action: PayloadAction<IProductVariant[]>) => {
            state.variants = action.payload;
            state.loading = false;
        },
        addVariant: (state, action: PayloadAction<IProductVariant>) => {
            state.variants.push(action.payload);
        },
        updateVariant: (state, action: PayloadAction<IProductVariant>) => {
            const index = state.variants.findIndex(v => v._id === action.payload._id);
            if (index !== -1) state.variants[index] = action.payload;
        },
        removeVariant: (state, action: PayloadAction<string>) => {
            state.variants = state.variants.filter(v => v._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setVariants, addVariant, updateVariant, removeVariant, setLoading, setError } = productVariantSlice.actions;
export default productVariantSlice.reducer;
