"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  UserCircle
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, getDashboardRoute } = useAuth();

  const baseRoute = user ? getDashboardRoute(user.role) : "/dashboard";

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: `${baseRoute}` },
    { name: "Orders", icon: ShoppingBag, href: `${baseRoute}/orders` },
    { name: "Products", icon: Package, href: `${baseRoute}/products` },
    { name: "Customers", icon: Users, href: `${baseRoute}/customers` },
    { name: "Analytics", icon: BarChart3, href: `${baseRoute}/analytics` },
    { name: "Profile", icon: UserCircle, href: `${baseRoute}/profile` },
    { name: "Settings", icon: Settings, href: `${baseRoute}/settings` },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push("/auth/login");
    }
  };

  return (
    <aside className="w-64 h-full bg-slate-50 dark:bg-[#060e20] border-r border-slate-200 dark:border-white/5 flex flex-col transition-colors duration-300">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-[#c0c1ff] dark:to-[#d0bcff]">
          ShopVerse
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:bg-indigo-500 dark:shadow-indigo-900/20" 
                  : "text-slate-600 hover:bg-slate-200/50 dark:text-[#dae2fd]/70 dark:hover:bg-white/5"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 dark:text-[#dae2fd]/70 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
