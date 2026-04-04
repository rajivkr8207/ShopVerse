"use client";

import React from "react";
import { 
  Package, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Truck,
  FileText
} from "lucide-react";
import Link from "next/link";

const mockOrders = [
  {
    id: "ORD-99A1-UX",
    date: "2026-03-28",
    status: "Delivered",
    total: 2450.00,
    items: [
      { name: "Void-Black Mechanical Matrix", qty: 1, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  {
    id: "ORD-88B2-VK",
    date: "2026-04-02",
    status: "In Transit",
    total: 899.99,
    items: [
      { name: "Neon-Edge Curved Array", qty: 1, image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=300" },
      { name: "Obsidian Mouse", qty: 1, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c3c9c?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  {
    id: "ORD-77C3-ZL",
    date: "2026-04-04",
    status: "Processing",
    total: 4500.00,
    items: [
      { name: "Quantum Core Workstation", qty: 2, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=300" }
    ]
  }
];

const StatusBadge = ({ status }) => {
  switch (status) {
    case "Delivered":
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] uppercase tracking-widest border border-emerald-500/20">
          <CheckCircle2 size={12} /> Delivered
        </span>
      );
    case "In Transit":
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-[10px] uppercase tracking-widest border border-indigo-500/20">
          <Truck size={12} /> In Transit
        </span>
      );
    case "Processing":
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-[10px] uppercase tracking-widest border border-amber-500/20">
          <Clock size={12} /> Processing
        </span>
      );
    default:
      return null;
  }
};

const MyOrders = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
            Order <span className="text-indigo-500">History.</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest mt-4">Review past acquisitions and track active deployments</p>
        </div>
      </div>

      {mockOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5">
          <Package className="w-16 h-16 text-slate-300 dark:text-white/10 mb-4" />
          <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">No Active Deployments</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-[#dae2fd]/40 mt-2">You haven't secured any hardware yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#171f33] rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl shadow-indigo-500/5 group hover:border-indigo-500/30 transition-colors">
              
              {/* Order Header */}
              <div className="bg-slate-50 dark:bg-white/5 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">Order Identifier</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{order.id}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">Transaction Date</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">Total Value</p>
                    <p className="text-sm font-black text-indigo-500 italic">${order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                   <StatusBadge status={order.status} />
                   <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-600 dark:text-[#dae2fd]/70 hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest hidden sm:flex">
                     <FileText size={14} /> Receipt
                   </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                   
                   <div className="flex flex-wrap items-center gap-4 flex-1">
                     {order.items.map((item, idx) => (
                       <div key={idx} className="flex flex-col items-center gap-2 group/item">
                         <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover/item:scale-110" />
                           {item.qty > 1 && (
                              <div className="absolute top-1 right-1 w-5 h-5 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] font-black text-white">
                                {item.qty}
                              </div>
                           )}
                         </div>
                       </div>
                     ))}
                     
                     <div className="ml-4 max-w-sm">
                       <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                         {order.items.map(i => i.name).join(', ')}
                       </p>
                       <p className="text-xs font-medium text-slate-500 dark:text-[#dae2fd]/40">
                         {order.items.length} {order.items.length === 1 ? 'hardware unit' : 'hardware units'}
                       </p>
                     </div>
                   </div>

                   <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-black text-indigo-500 uppercase tracking-widest transition-all active:scale-95 group/btn whitespace-nowrap">
                     View Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>

                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
