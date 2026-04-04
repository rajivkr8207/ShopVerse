"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const { token } = useParams();
  const router = useRouter();
  const { verifyEmail, clearAuthError } = useAuth();
  
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const performVerification = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      clearAuthError();
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };

    performVerification();
  }, [token, verifyEmail, clearAuthError]);

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-pulse">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center ring-4 ring-indigo-500/20">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
            <p className="text-center text-sm text-slate-400 font-medium">
              Verifying your email address with our servers...
            </p>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center ring-4 ring-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <p className="text-center text-sm text-slate-400 leading-relaxed max-w-[280px]">
              Awesome! Your email has been successfully verified. You're now ready to use ShopVerse.
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center ring-4 ring-rose-500/20">
              <XCircle className="w-10 h-10 text-rose-500" />
            </div>
            <p className="text-center text-sm text-slate-400 leading-relaxed max-w-[280px]">
              Oh no! Verification failed. The link might be expired or already used.
            </p>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => router.push("/auth/register")}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                Sign Up Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-400 py-2 uppercase tracking-[0.2em] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout
      title="Verification Status"
      subtitle="Securing your account for high-end commerce"
    >
      {renderContent()}
    </AuthLayout>
  );
}
