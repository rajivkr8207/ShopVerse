import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./types/cart.type";

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};
const calculateTotals = (state: CartState) => {
    let totalQty = 0;
    let totalAmt = 0;

    state.items.forEach((item) => {
        totalQty += item.quantity;
        totalAmt += item.price * item.quantity;
    });

    state.totalQuantity = totalQty;
    state.totalAmount = totalAmt;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            calculateTotals(state);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            calculateTotals(state);
        },

        increaseQty: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if (item) item.quantity += 1;
            calculateTotals(state);
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            calculateTotals(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;