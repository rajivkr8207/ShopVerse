"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const { register, loading, clearAuthError } = useAuth();
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    clearAuthError();
    const result = await register({
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    
    if (result.success) {
      router.push("/auth/login");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join ShopVerse today and start managing your store"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

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
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.phone}
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
            placeholder="Set Password"
            required
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
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

        {/* Confirm Password Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ShieldCheck className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start gap-3 mt-4">
          <input
            type="checkbox"
            required
            id="terms"
            className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-offset-[#0b1326] focus:ring-indigo-500"
          />
          <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
            By signing up, you agree to our <Link href="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait mt-2 active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-tight"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
