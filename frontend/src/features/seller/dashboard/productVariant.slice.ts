import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productVariantService } from "./services/productVariant.service";
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

export const fetchVariants = createAsyncThunk("productVariant/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await productVariantService.getVariants();
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch variants");
    }
});

export const addVariant = createAsyncThunk("productVariant/add", async (data: Partial<IProductVariant>, thunkAPI) => {
    try {
        const response = await productVariantService.createVariant(data);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create variant");
    }
});

export const editVariant = createAsyncThunk("productVariant/edit", async ({ id, data }: { id: string, data: Partial<IProductVariant> }, thunkAPI) => {
    try {
        const response = await productVariantService.updateVariant(id, data);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update variant");
    }
});

export const removeVariant = createAsyncThunk("productVariant/remove", async (id: string, thunkAPI) => {
    try {
        await productVariantService.deleteVariant(id);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete variant");
    }
});

const productVariantSlice = createSlice({
    name: "productVariant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchVariants.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchVariants.fulfilled, (state, action) => { state.loading = false; state.variants = action.payload; })
            .addCase(fetchVariants.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
            // Add
            .addCase(addVariant.fulfilled, (state, action) => { state.variants.push(action.payload); })
            // Edit
            .addCase(editVariant.fulfilled, (state, action) => {
                const index = state.variants.findIndex(v => v._id === action.payload._id);
                if (index !== -1) state.variants[index] = action.payload;
            })
            // Remove
            .addCase(removeVariant.fulfilled, (state, action) => {
                state.variants = state.variants.filter(v => v._id !== action.payload);
            });
    }
});

export default productVariantSlice.reducer;
