import { createSlice } from "@reduxjs/toolkit";
import { marketplaceService } from "./services/marketplace.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const res = await marketplaceService.getCartApi();
        return res.data;
    }
);

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const calculateTotals = (items) => {
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    return { totalAmount, totalQuantity };
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        ...initialState,
        ...calculateTotals(initialState.items),
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }

            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);

            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
            }

            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data?.items || action.payload.items || [];

                const totals = calculateTotals(state.items);
                state.totalAmount = totals.totalAmount;
                state.totalQuantity = totals.totalQuantity;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
