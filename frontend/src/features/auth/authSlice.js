import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isEmailVerified: false,
    registrationSuccess: false,
    passwordResetRequested: false,
    passwordResetSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setAuthStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        setAuthSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isEmailVerified = action.payload.user?.isEmailVerified || false;
            state.error = null;
        },

        setAuthFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isEmailVerified = action.payload?.isEmailVerified || false;
        },

        setRegistrationSuccess: (state, action) => {
            state.registrationSuccess = action.payload;
            state.loading = false;
        },

        setPasswordResetRequested: (state, action) => {
            state.passwordResetRequested = action.payload;
            state.loading = false;
        },

        setPasswordResetSuccess: (state, action) => {
            state.passwordResetSuccess = action.payload;
            state.loading = false;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isEmailVerified = false;
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setAuthStart,
    setAuthSuccess,
    setAuthFailure,
    setUser,
    setRegistrationSuccess,
    setPasswordResetRequested,
    setPasswordResetSuccess,
    logout,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;