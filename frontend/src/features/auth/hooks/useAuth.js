"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setAuthStart,
  setAuthSuccess,
  setAuthFailure,
  setUser,
  logout as logoutAction,
  clearError,
  setRegistrationSuccess,
  setPasswordResetRequested,
  setPasswordResetSuccess
} from "../authSlice";
import { authService } from "../services/auth.services";
import { toast } from "react-toastify";
import { useEffect } from "react";

/**
 * useAuth Hook
 * Provides a centralized interface for all authentication operations.
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error, isAuthenticated, isEmailVerified } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.auth.user);
  // Helper to handle async auth actions
  const handleAuthAction = async (actionFn, successMessage, successCallback) => {
    dispatch(setAuthStart());
    try {
      const response = await actionFn();
      if (successMessage) toast.success(successMessage);
      if (successCallback) successCallback(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || "An unexpected error occurred.";
      dispatch(setAuthFailure(message));
      // toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    return handleAuthAction(
      () => authService.login(credentials),
      `Welcome back, ${credentials.email}!`,
      (data) => dispatch(setAuthSuccess({ user: data.user }))
    );
  };

  const handleGetMe = async () => {
    dispatch(setAuthStart());
    try {
      const response = await authService.getMe();
      console.log(response)
      const user = response.data.data;
      dispatch(setAuthSuccess({ user }));

      const dashboardRoute = getDashboardRoute(user.role);
      router.push(dashboardRoute);

      return { success: true, user };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch user data.";
      dispatch(setAuthFailure(message));
      return { success: false, error: message };
    }
  };


  const register = async (userData) => {
    return handleAuthAction(
      () => authService.register(userData),
      "Account created! Please verify your email.",
      () => dispatch(setRegistrationSuccess(true))
    );
  };

  const logout = async () => {
    dispatch(setAuthStart());
    try {
      await authService.logout();
      dispatch(logoutAction());
      toast.info("Logged out successfully.");
      return { success: true };
    } catch (err) {
      // Even if logout fails on server, we clear local state
      dispatch(logoutAction());
      return { success: true };
    }
  };

  const forgotPassword = async (email) => {
    return handleAuthAction(
      () => authService.forgotPassword(email),
      "Reset link sent to your email.",
      () => dispatch(setPasswordResetRequested(true))
    );
  };

  const resetPassword = async (token, password) => {
    return handleAuthAction(
      () => authService.verifyForgotPassword(token, { password }),
      "Password reset successful!",
      () => dispatch(setPasswordResetSuccess(true))
    );
  };

  const verifyEmail = async (token) => {
    return handleAuthAction(
      () => authService.verifyEmail(token),
      "Email verified successfully!",
      (data) => dispatch(setUser(data.user))
    );
  };

  const changePassword = async (passwords) => {
    return handleAuthAction(
      () => authService.changePassword(passwords),
      "Password updated successfully!"
    );
  }

  const getProfile = async () => {
    return handleAuthAction(
      () => authService.profile(),
      null,
      (data) => dispatch(setUser(data.user))
    );
  };

  /**
   * Helper to get the correct dashboard route based on user role
   */
  const getDashboardRoute = (role) => {
    switch (role) {
      case "ADMIN": return "/admin";
      case "SELLER": return "/seller";
      case "USER": return "/marketplace";
      case "RIDER": return "/rider";
      default: return "/marketplace";
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isEmailVerified,
    login,
    handleGetMe,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    changePassword,
    getProfile,
    getDashboardRoute,
    clearAuthError: () => dispatch(clearError()),
  };
};
