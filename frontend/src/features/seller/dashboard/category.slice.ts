import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "./services/category.service";
import type { ICategory } from "./types/seller.type";

interface CategoryState {
    categories: ICategory[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk("category/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await categoryService.getCategories();
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
});

export const addCategory = createAsyncThunk("category/add", async (data: Partial<ICategory>, thunkAPI) => {
    try {
        const response = await categoryService.createCategory(data);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
});

export const editCategory = createAsyncThunk("category/edit", async ({ id, data }: { id: string, data: Partial<ICategory> }, thunkAPI) => {
    try {
        const response = await categoryService.updateCategory(id, data);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
});

export const removeCategory = createAsyncThunk("category/remove", async (id: string, thunkAPI) => {
    try {
        await categoryService.deleteCategory(id);
        return id;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
            .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
            // Add
            .addCase(addCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
            // Edit
            .addCase(editCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(c => c._id === action.payload._id);
                if (index !== -1) state.categories[index] = action.payload;
            })
            // Remove
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c._id !== action.payload);
            });
    }
});

export default categorySlice.reducer;
