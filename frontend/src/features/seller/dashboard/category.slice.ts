import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<ICategory>) => {
            const index = state.categories.findIndex(c => c._id === action.payload._id);
            if (index !== -1) state.categories[index] = action.payload;
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(c => c._id !== action.payload);
        }
    },
});

export const { setCategories, addCategory, updateCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
