"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const { forgotPassword, loading, clearAuthError } = useAuth();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();

    const result = await forgotPassword(email);
    if (result.success) {
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle={`We've sent a password reset link to ${email}`}
      >
        <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center ring-4 ring-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <p className="text-center text-sm text-slate-400 leading-relaxed max-w-[280px]">
            Please follow the link in the email to safely reset your password. If you don't see it, check your spam folder.
          </p>
          <button 
            onClick={() => setIsSent(false)}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-[0.2em]"
          >
            Didn't get it? Try again
          </button>
          <Link
            href="/auth/login"
            className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Protect Your Account"
      subtitle="Enter your email to receive a secure password reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Account Email Address"
            required
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 text-white placeholder:text-slate-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Send Security Link
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500 mt-8 uppercase tracking-widest text-[10px] font-bold">
          Remembered your password?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
