import api from "../../../lib/api/axios";
import type { LoginPayload, RegisterPayload } from "../types/auth.type";


export const authService = {
  register: async (data: RegisterPayload) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginPayload) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const res = await api.post("/auth/verify-email", { email, otp });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res.data;
  },

  logout: async () => {
    const res = await api.get("/auth/logout");
    return res.data;
  },
};