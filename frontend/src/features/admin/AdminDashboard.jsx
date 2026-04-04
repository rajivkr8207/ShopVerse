"use client";

import React from "react";
import Header from "@/features/seller/components/Header";
import Sidebar from "@/features/seller/components/Sidebar";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { 
  Users, 
  Settings, 
  ShieldCheck, 
  Globe, 
  Activity,
  BarChart3,
  Search,
  Bell
} from "lucide-react";

/**
 * AdminDashboard
 * High-level monitoring and management interface for the ShopVerse ecosystem.
 */
export default function AdminDashboard() {
  const stats = [
    { label: "Total Active Users", value: "2.4K", icon: <Users size={20} />, color: "bg-indigo-500" },
    { label: "Global Revenue", value: "$1.2M", icon: <BarChart3 size={20} />, color: "bg-emerald-500" },
    { label: "System Uptime", value: "99.98%", icon: <Activity size={20} />, color: "bg-amber-500" },
    { label: "Verification Queue", value: "12", icon: <ShieldCheck size={20} />, color: "bg-rose-500" },
  ];

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="flex h-screen bg-slate-50 dark:bg-[#0b1326] transition-colors duration-300 overflow-hidden font-sans">
        <Sidebar />
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12 animate-in fade-in duration-700">
            
            {/* Admin Welcome Hero */}
            <div className="relative rounded-[2.5rem] bg-indigo-600 border border-white/10 overflow-hidden p-12 group shadow-2xl shadow-indigo-600/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-600 to-transparent"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={12} /> System Admin Level
                  </div>
                  <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Ecosystem Control.
                  </h1>
                  <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                    Manage global platform health, user roles, and security infrastructure from your central obsidian command.
                  </p>
                </div>
                <div className="flex gap-4">
                   <button className="h-16 px-8 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                      Security Audit
                   </button>
                   <button className="h-16 w-16 bg-white/10 border border-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                      <Settings size={22} />
                   </button>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#171f33] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-4 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10`}>
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Global User Management Hub (Mock) */}
            <div className="bg-white dark:bg-[#171f33] rounded-[3rem] border border-slate-200 dark:border-white/5 overflow-hidden">
               <div className="p-10 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">User Authority Hub</h2>
                  <div className="flex gap-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input type="text" placeholder="UUID Or Email Search..." className="pl-12 pr-6 py-4 bg-slate-50 dark:bg-[#0b1326] rounded-2xl border border-slate-200 dark:border-white/5 text-xs font-bold text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-500/10 outline-none w-64" />
                     </div>
                  </div>
               </div>
               
               <div className="p-10 space-y-4">
                  {[
                    { name: "John Carter", role: "SELLER", email: "carter@shopverse.com", status: "Active" },
                    { name: "Sonia Blaze", role: "RIDER", email: "blaze@logistics.net", status: "Pending" },
                    { name: "Marcus Vane", role: "USER", email: "vane@obsidian.io", status: "Active" },
                    { name: "Elena Kosh", role: "ADMIN", email: "kosh@hq.shopverse", status: "Active" }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:scale-[1.01]">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-black italic">{user.name[0]}</div>
                          <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{user.name}</p>
                             <p className="text-xs text-slate-400 dark:text-[#dae2fd]/20">{user.email}</p>
                          </div>
                       </div>
                       <div className="px-4 py-2 rounded-xl bg-white dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                          {user.role}
                       </div>
                       <div className="flex gap-3">
                          <button className="p-3 text-slate-400 hover:text-indigo-500 transition-colors"><Settings size={18} /></button>
                          <button className="p-3 text-slate-400 hover:text-rose-500 transition-colors"><Bell size={18} /></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
