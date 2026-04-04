"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Search, Bell, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 dark:bg-[#0b1326]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 px-8 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1">
        <div className="bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-2xl flex items-center gap-3 w-96 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-opacity-20 transition-all duration-300 group">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="bg-transparent border-none outline-none text-slate-700 dark:text-[#dae2fd] w-full text-sm placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-[#dae2fd]/70 transition-all duration-300 relative group overflow-hidden border border-slate-200 dark:border-white/5">
          <Bell className="w-5 h-5 group-hover:shake duration-300" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-[#0b1326]"></span>
        </button>

        <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2"></div>

        <Link 
          href="/dashboard/profile"
          className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-slate-200 dark:hover:border-white/5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white ring-2 ring-white/10 dark:ring-white/5 ring-offset-2 ring-offset-white dark:ring-offset-[#0b1326] transition-all group-hover:scale-105 overflow-hidden">
            {user?.fullname ? (
              <img 
                src={`https://ui-avatars.com/api/?name=${user.fullname}&background=transparent&color=fff&size=64`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-900 dark:text-[#dae2fd]">
              {user?.fullname || "Admin User"}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-[#dae2fd]/20 font-black tracking-[0.1em] uppercase">
              {user?.role || "STORE MANAGER"}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
