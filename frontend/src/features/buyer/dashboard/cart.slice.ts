import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./types/cart.type";

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0,
};




const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload;
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        },
        clearCartLocal: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { setCart, setLoading, setError, setTotalQuantity, setTotalAmount, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;