"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle
 * A premium UI component to switch between Light and Dark mode using Redux state.
 */
const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 p-2.5 mr-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 opacity-50" />
    );
  }

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2.5 mr-2 rounded-2xl relative overflow-hidden group transition-all duration-300 ease-out bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 shadow-sm active:scale-95"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
