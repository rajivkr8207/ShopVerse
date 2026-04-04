"use client";

import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const data = [
  { name: "Jan", revenue: 4500, orders: 120 },
  { name: "Feb", revenue: 5200, orders: 150 },
  { name: "Mar", revenue: 4800, orders: 140 },
  { name: "Apr", revenue: 6100, orders: 180 },
  { name: "May", revenue: 5900, orders: 170 },
  { name: "Jun", revenue: 7200, orders: 210 },
  { name: "Jul", revenue: 8500, orders: 250 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-[#171f33]/90 backdrop-blur-xl border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-2xl">
        <p className="text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 mb-2 uppercase tracking-widest">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-bold text-indigo-600 dark:text-[#c0c1ff]">
            Revenue: <span className="ml-2">${payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-sm font-bold text-violet-600 dark:text-[#d0bcff]">
            Orders: <span className="ml-2">{payload[1].value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-[#171f33] p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-[#dae2fd]">Revenue vs Orders</h3>
          <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40">Last 7 months performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            <span className="text-xs font-semibold text-slate-600 dark:text-[#dae2fd]/60 uppercase tracking-tighter">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-violet-500"></span>
            <span className="text-xs font-semibold text-slate-600 dark:text-[#dae2fd]/60 uppercase tracking-tighter">Orders</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            animationDuration={2000}
          />
          <Area 
            type="monotone" 
            dataKey="orders" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorOrders)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
