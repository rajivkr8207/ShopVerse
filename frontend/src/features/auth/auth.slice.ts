import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types/auth.type";


const initialState: AuthState = {
    user: null,
    loading: false,
    isAuthenticated: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        setloading(state, action) {
            state.loading = action.payload;
        }
    },
});

export const { setUser, clearUser,setloading } = authSlice.actions;

export default authSlice.reducer;