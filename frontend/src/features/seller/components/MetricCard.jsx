"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * MetricCard Component
 */
const MetricCard = ({ title, value, change, isPositive, icon: Icon, color = "indigo" }) => {
  // Pre-define classes to ensure Tailwind picked them up
  const colorMap = {
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-50/50 dark:ring-indigo-900/10",
    violet: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-50/50 dark:ring-violet-900/10",
    rose: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-50/50 dark:ring-rose-900/10",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-50/50 dark:ring-emerald-900/10",
  };

  const glowMap = {
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
    rose: "bg-rose-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="relative overflow-hidden p-6 rounded-3xl bg-white dark:bg-[#171f33] border border-slate-200 dark:border-white/5 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10 group active:scale-[0.98]">
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-10 ${glowMap[color]} transition-opacity duration-300 group-hover:opacity-20`}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-wider mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-[#dae2fd] mb-2 tracking-tight">
            {value}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${
              isPositive 
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {change}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-[#dae2fd]/20 font-medium uppercase tracking-tighter">VS LAST MONTH</span>
          </div>
        </div>
        
        <div className={`p-3.5 rounded-2xl ring-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
