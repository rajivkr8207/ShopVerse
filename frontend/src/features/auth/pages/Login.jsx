"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  LogIn,
  ShieldCheck,
  Package,
  ShoppingCart,
  User
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";
import { clonePageVaryPathWithNewSearchParams } from "next/dist/client/components/segment-cache/vary-path";

export default function Login() {
  const router = useRouter();
  const { login, loading, clearAuthError, getDashboardRoute } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    const result = await login(formData);
    if (result.success) {
      const dashboard = getDashboardRoute(result.data.data.role);
      router.push(dashboard);
    }
  };

  // Mock roles for development/demo testing
  const handleMockLogin = (role) => {
    const mockUser = {
      name: `Demo ${role}`,
      email: `${role.toLowerCase()}@shopverse.com`,
      role: role,
      isEmailVerified: true
    };
    dispatch(setUser(mockUser));
    const dashboard = getDashboardRoute(role);
    router.push(dashboard);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your ShopVerse dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-offset-[#0b1326] focus:ring-indigo-500"
            />
            <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer group-hover:text-slate-300 transition-colors">
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-tight"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait mt-4 active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-tight"
          >
            Create Account
          </Link>
        </p>
        <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
          <p className="text-[10px] text-center font-black text-slate-500 uppercase tracking-[0.2em]">Developer Quick Roles</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { role: "ADMIN", icon: <ShieldCheck size={14} />, color: "hover:bg-rose-500/20 hover:text-rose-400" },
              { role: "SELLER", icon: <Package size={14} />, color: "hover:bg-amber-500/20 hover:text-amber-400" },
              { role: "RIDER", icon: <LogIn size={14} />, color: "hover:bg-emerald-500/20 hover:text-emerald-400" },
              { role: "USER", icon: <User size={14} />, color: "hover:bg-indigo-500/20 hover:text-indigo-400" },
            ].map((mock) => (
              <button
                key={mock.role}
                type="button"
                onClick={() => handleMockLogin(mock.role)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 transition-all ${mock.color} active:scale-90`}
              >
                {mock.icon}
                {mock.role}
              </button>
            ))}
          </div>
        </div>

      </form>
    </AuthLayout>
  );
}
