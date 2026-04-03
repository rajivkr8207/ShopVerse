import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },

        removeUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;

            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
        },
    },
});

export const {
    setUser,
    removeUser,
    setLoading,
    setError,
    clearError,
    logout,
} = authSlice.actions;

export default authSlice.reducer;