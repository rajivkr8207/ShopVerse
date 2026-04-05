"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";
import { Lock, ShieldCheck, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const { resetPassword, loading, clearAuthError } = useAuth();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    const result = await resetPassword(token, formData.password);
    if (result.success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password Secured"
        subtitle="Your password has been successfully reset"
      >
        <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center ring-4 ring-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <p className="text-center text-sm text-slate-400 leading-relaxed max-w-[280px]">
            Your account security has been updated. You can now use your new password to access your dashboard.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            Sign In Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Secure Reset"
      subtitle="Complete your password reset for ultimate account safety"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
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

        {/* Confirm Password Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ShieldCheck className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Verify New Password"
            required
            className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
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
              Update Security Code
              <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500 mt-8 uppercase tracking-widest text-[10px] font-bold">
          Technical issues?{" "}
          <Link
            href="/contact"
            className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1 underline decoration-indigo-400/20"
          >
            Contact Support
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
