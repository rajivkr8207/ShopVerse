"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Camera, 
  Edit3,
  Globe,
  Bell,
  LogOut,
  MapPin
} from "lucide-react";
import ChangePassword from "../components/ChangePassword";
import DashboardLayout from "@/features/seller/components/DashboardLayout";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // profile, security, notifications

  const personalInfo = [
    { label: "Full Name", value: user?.fullname || "Admin User", icon: User },
    { label: "Email Address", value: user?.email || "admin@shopverse.com", icon: Mail },
    { label: "Phone Number", value: user?.phone || "+1 (555) 000-0000", icon: Phone },
    { label: "Location", value: "New York, USA", icon: MapPin },
    { label: "Web URL", value: "shopverse.com", icon: Globe },
    { label: "Member Since", value: "Jan 2026", icon: Calendar },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header Hero Area */}
        <div className="relative h-64 rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-900 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl opacity-20"></div>
          
          <div className="absolute -bottom-16 left-12 flex items-end gap-8 z-10">
            <div className="relative">
              <div className="w-40 h-40 rounded-3xl border-8 border-white dark:border-[#0b1326] bg-slate-200 overflow-hidden shadow-2xl relative group/avatar">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.fullname || 'Admin'}&background=random&size=200`} 
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-[#0b1326] shadow-lg"></div>
            </div>
            
            <div className="mb-20">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">
                {user?.fullname || "Admin User"}
              </h1>
              <p className="text-indigo-200/60 font-bold uppercase tracking-[0.3em] text-xs">
                Premium Store Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-3">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "profile" 
                  ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 translate-x-2" 
                  : "text-slate-500 dark:text-[#dae2fd]/40 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <User className="w-5 h-5" />
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "security" 
                  ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 translate-x-2" 
                  : "text-slate-500 dark:text-[#dae2fd]/40 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              Security
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === "notifications" 
                  ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 translate-x-2" 
                  : "text-slate-500 dark:text-[#dae2fd]/40 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <Bell className="w-5 h-5" />
              Privacy
            </button>
            
            <div className="h-px bg-slate-100 dark:bg-white/5 my-6"></div>
            
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-500/5 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                {/* Personal Info Card */}
                <div className="bg-white dark:bg-[#171f33] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-[#dae2fd]">Personal Information</h3>
                    <button className="flex items-center gap-2 text-xs font-black text-indigo-500 hover:scale-105 transition-transform uppercase tracking-widest">
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 relative z-10">
                    {personalInfo.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="group">
                          <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em] mb-3">
                            {item.label}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-[#0b1326] rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 dark:text-[#dae2fd]">{item.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-3xl text-white">
                    <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-1 opacity-60">Total Orders</p>
                    <h4 className="text-3xl font-black italic tracking-tighter">1,240</h4>
                  </div>
                  <div className="bg-white dark:bg-[#171f33] p-6 rounded-3xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white">
                    <p className="text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest mb-1">Store Rating</p>
                    <h4 className="text-3xl font-black italic tracking-tighter">4.9/5</h4>
                  </div>
                  <div className="bg-white dark:bg-[#171f33] p-6 rounded-3xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white">
                    <p className="text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest mb-1">Response Time</p>
                    <h4 className="text-3xl font-black italic tracking-tighter">2.4h</h4>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <ChangePassword />
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
