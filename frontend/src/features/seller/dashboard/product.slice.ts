import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./services/product.service";
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

export const fetchProducts = createAsyncThunk("product/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await productService.getProducts();
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
});

export const addProduct = createAsyncThunk("product/add", async (formData: FormData, thunkAPI) => {
    try {
        const response = await productService.createProduct(formData);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
});

export const editProduct = createAsyncThunk("product/edit", async ({ id, data }: { id: string, data: any }, thunkAPI) => {
    try {
        const response = await productService.updateProduct(id, data);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
});

export const removeProduct = createAsyncThunk("product/remove", async (id: string, thunkAPI) => {
    try {
        await productService.deleteProduct(id);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
            .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
            // Add
            .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
            // Edit
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.products[index] = action.payload;
            })
            // Remove
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            });
    }
});

export default productSlice.reducer;
