"use client";

import React from "react";
import { ShoppingCart, UserPlus, CreditCard, RefreshCcw } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "order",
    title: "New order received #8829",
    time: "2 minutes ago",
    amount: "$240.00",
    icon: ShoppingCart,
    color: "indigo"
  },
  {
    id: 2,
    type: "user",
    title: "New customer registered",
    time: "15 minutes ago",
    icon: UserPlus,
    color: "violet"
  },
  {
    id: 3,
    type: "payment",
    title: "Payment processed for #8824",
    time: "1 hour ago",
    amount: "$1,200.00",
    icon: CreditCard,
    color: "emerald"
  },
  {
    id: 4,
    type: "refund",
    title: "Refund request for #8812",
    time: "3 hours ago",
    amount: "$85.00",
    icon: RefreshCcw,
    color: "rose"
  }
];

const RecentActivity = () => {
  const colorMap = {
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900/20",
    violet: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:ring-violet-100 dark:group-hover:ring-violet-900/20",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:ring-emerald-100 dark:group-hover:ring-emerald-900/20",
    rose: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:ring-rose-100 dark:group-hover:ring-rose-900/20",
  };

  return (
    <div className="bg-white dark:bg-[#171f33] p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-[#dae2fd]">Recent Activity</h3>
        <button className="text-xs font-bold text-indigo-600 dark:text-[#c0c1ff] hover:underline uppercase tracking-widest">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4 group cursor-pointer">
              <div className={`p-2.5 rounded-xl ring-2 ring-transparent transition-all duration-300 ${colorMap[activity.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 border-b border-slate-100 dark:border-white/5 pb-4 group-last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-[#dae2fd] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {activity.title}
                  </h4>
                  {activity.amount && (
                    <span className="text-sm font-bold text-slate-900 dark:text-[#dae2fd]">{activity.amount}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-[#dae2fd]/40">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
