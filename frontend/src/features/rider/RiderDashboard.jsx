"use client";

import React from "react";
import Header from "@/features/seller/components/Header";
import Sidebar from "@/features/seller/components/Sidebar";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { 
  Package, 
  MapPin, 
  Navigation, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from "lucide-react";

/**
 * RiderDashboard
 * Logistics and delivery-focused interface for RIDER role users.
 */
export default function RiderDashboard() {
  const activeDeliveries = [
    { id: "DL-101", customer: "Liam Vance", distance: "2.4 km", status: "In Transit", deadline: "12:45 PM" },
    { id: "DL-102", customer: "Sarah K.", distance: "4.8 km", status: "Wait for Pickup", deadline: "01:20 PM" },
  ];

  return (
    <ProtectedRoute requiredRole="RIDER">
      <div className="flex h-screen bg-slate-50 dark:bg-[#0b1326] transition-colors duration-300 overflow-hidden font-sans">
        <Sidebar />
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12 animate-in fade-in duration-700">
            
            {/* Rider Hero Action */}
            <div className="relative rounded-[2.5rem] bg-emerald-600 border border-white/10 overflow-hidden p-12 group shadow-2xl shadow-emerald-600/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-transparent"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                    <Zap size={12} /> Active Duty Status
                  </div>
                  <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
                    Delivery <br /> <span className="opacity-60">Logistics.</span>
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                   <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Today's Earnings</p>
                      <p className="text-4xl font-black tracking-tighter italic">$184.20</p>
                   </div>
                   <button className="h-16 px-8 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                      Go Online
                   </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
              
              {/* Active Deliveries List */}
              <div className="lg:col-span-2 space-y-8">
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Queue of Transit</h2>
                 <div className="space-y-6">
                    {activeDeliveries.map((dl, i) => (
                      <div key={i} className="group p-8 rounded-[2rem] bg-white dark:bg-[#171f33] border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:shadow-xl hover:shadow-emerald-500/5">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-[#0b1326] rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg border border-slate-200 dark:border-white/5">
                               <Package size={28} />
                            </div>
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{dl.id}</span>
                                  <div className="w-1 h-1 bg-slate-300 dark:bg-white/10 rounded-full"></div>
                                  <span className="text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest">{dl.deadline}</span>
                               </div>
                               <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic group-hover:text-emerald-500 transition-colors">{dl.customer}</h4>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-10">
                            <div className="text-center md:text-right">
                               <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/10 uppercase tracking-widest">Distance Rem.</p>
                               <p className="text-lg font-black text-slate-900 dark:text-white italic tracking-tighter">{dl.distance}</p>
                            </div>
                            <button className="h-14 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl">
                               Navigation <ArrowUpRight size={14} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Rider Sidebar View - Performance */}
              <div className="lg:col-span-1 space-y-8">
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Performance</h2>
                 <div className="p-10 rounded-[2.5rem] bg-white dark:bg-[#171f33] border border-slate-200 dark:border-white/5 space-y-10">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-emerald-500" />
                          <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest">Average Hub Time</p>
                       </div>
                       <p className="text-lg font-black text-slate-800 dark:text-white italic tracking-tighter">14.2 min</p>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Navigation className="w-5 h-5 text-emerald-500" />
                          <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest">Completed Shifts</p>
                       </div>
                       <p className="text-lg font-black text-slate-800 dark:text-white italic tracking-tighter">42 Units</p>
                    </div>
                    
                    <div className="h-px bg-slate-100 dark:bg-white/5 my-4"></div>
                    
                    <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                       <div className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-emerald-500" />
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Rider Security</p>
                       </div>
                       <p className="text-xs font-medium text-slate-500 dark:text-[#dae2fd]/40 italic leading-relaxed">
                          "Your obsidian transport insurance is active. Please ensure all units are signed via the QR code upon arrival."
                       </p>
                    </div>
                 </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
