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

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Or continue with</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <Link
          href="http://localhost:8000/api/auth/google"
          className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </Link>

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
