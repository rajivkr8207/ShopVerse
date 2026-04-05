"use client";

import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

/**
 * AuthLayout Component
 * @param {Object} props
 * @param {string} props.title - Main title for the auth card
 * @param {string} props.subtitle - Subtitle for context
 * @param {React.ReactNode} props.children - Form content
 */
const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0b1326] flex items-center justify-center p-6 relative overflow-hidden font-inter transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse duration-5000"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Back to Home / Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-6"
          >
            <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-widest">Back to Store</span>
          </Link>
          
          <div className="p-1 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 mb-4 transition-transform hover:scale-105 duration-300">
            <div className="bg-[#0b1326] px-4 py-2 rounded-xl">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-tighter">
                ShopVerse
              </h1>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">
                {title}
              </h2>
              <p className="text-slate-400 font-medium text-sm">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            &copy; 2026 ShopVerse &bull; Premium Commerce
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
