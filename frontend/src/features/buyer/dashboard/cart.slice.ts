import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "./services/cart.service";
import type { CartState, CartItem } from "./types/cart.type";

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0,
};

// 🔹 ASYNC THUNKS
export const syncCart = createAsyncThunk("cart/sync", async (_, thunkAPI) => {
    try {
        const response = await cartService.getCart();
        return response.data; // This is the array of cart items
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to sync cart");
    }
});

export const addItemToCart = createAsyncThunk(
    "cart/addItem",
    async (data: { productId: string; variantId?: string; quantity: number }, thunkAPI) => {
        try {
            await cartService.addToCart(data);
            thunkAPI.dispatch(syncCart());
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add item");
        }
    }
);

export const updateItemQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async (data: { cartId: string; quantity: number }, thunkAPI) => {
        try {
            await cartService.updateQuantity(data.cartId, data.quantity);
            thunkAPI.dispatch(syncCart());
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update quantity");
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    "cart/removeItem",
    async (cartId: string, thunkAPI) => {
        try {
            await cartService.removeFromCart(cartId);
            thunkAPI.dispatch(syncCart());
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove item");
        }
    }
);

const calculateTotals = (state: CartState) => {
    let totalQty = 0;
    let totalAmt = 0;

    state.items.forEach((item) => {
        totalQty += item.quantity;
        const price = item.variantId?.price || item.productId.basePrice || 0;
        totalAmt += price * item.quantity;
    });

    state.totalQuantity = totalQty;
    state.totalAmount = totalAmt;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartLocal: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(syncCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(syncCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
                calculateTotals(state);
            })
            .addCase(syncCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;