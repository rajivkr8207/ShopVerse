"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Save, 
  RefreshCcw 
} from "lucide-react";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const { changePassword, loading, clearAuthError } = useAuth();
  
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    clearAuthError();
    const result = await changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    if (result.success) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <div className="bg-white dark:bg-[#171f33] p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-[#dae2fd]">Security Settings</h3>
          <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40">Update your account password regularly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Password */}
          <div className="relative group md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest mb-2 ml-1">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter current password"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/30 text-slate-900 dark:text-white transition-all"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* New Password */}
          <div className="relative group">
            <label className="block text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest mb-2 ml-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New security key"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/30 text-slate-900 dark:text-white transition-all"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="relative group">
            <label className="block text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest mb-2 ml-1">
              Verify Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RefreshCcw className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat new password"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/30 text-slate-900 dark:text-white transition-all"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs font-bold text-slate-500 hover:text-violet-500 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-violet-500/20 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
