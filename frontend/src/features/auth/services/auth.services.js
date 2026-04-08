import api from "@/lib/api/axios";

export const authService = {
    register: async (data) => {
        return await api.post("/auth/register", data);
    },

    login: async (data) => {
        const res = await api.post("/auth/login", data);
        return res;
    },

    getMe: async () => {
        return await api.get("/auth/get-me");
    },

    profile: async () => {
        const res = await api.get("/auth/profile");
        return res.data
    },

    logout: async () => {
        await api.get("/auth/logout");
    },

    verifyEmail: async (token) => {
        return await api.get(`/auth/verify/${token}`);
    },

    forgotPassword: async (email) => {
        return await api.post("/auth/forgot-password", { email });
    },

    verifyForgotPassword: async (token, data) => {
        return await api.post(`/auth/reset-password/${token}`, data);
    },

    changePassword: async (data) => {
        return await api.post("/auth/change-password", data);
    },
};