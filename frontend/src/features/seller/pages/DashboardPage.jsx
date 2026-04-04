"use client";

import React from "react";
import { 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Activity,
  Plus,
  Filter,
  Download
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import RecentActivity from "../components/RecentActivity";
import TopProducts from "../components/TopProducts";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="SELLER">
      <DashboardLayout>
        <div className="flex flex-col gap-8 pb-12">
          {/* Page Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-[#dae2fd] tracking-tight mb-2 uppercase italic">
                Seller Hub
              </h1>
              <p className="text-slate-500 dark:text-[#dae2fd]/40 font-medium">
                Welcome back, <span className="text-indigo-600 dark:text-[#c0c1ff] font-bold">{user?.name || "Seller"}!</span> Here's your inventory and sales performance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#171f33] text-slate-700 dark:text-[#dae2fd]/70 text-sm font-bold border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#171f33] text-slate-700 dark:text-[#dae2fd]/70 text-sm font-bold border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-700/30 transition-all active:scale-95 group">
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                Add Product
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <MetricCard 
              title="Total Revenue" 
              value="$124,592.50" 
              change="+12.5%" 
              isPositive={true} 
              icon={DollarSign}
              color="indigo"
            />
            <MetricCard 
              title="New Customers" 
              value="1,240" 
              change="+8.2%" 
              isPositive={true} 
              icon={Users}
              color="violet"
            />
            <MetricCard 
              title="Active Orders" 
              value="82" 
              change="-2.4%" 
              isPositive={false} 
              icon={ShoppingBag}
              color="rose"
            />
            <MetricCard 
              title="Refund Rate" 
              value="1.2%" 
              change="-0.5%" 
              isPositive={true} 
              icon={Activity}
              color="emerald"
            />
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <TopProducts />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
