"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../marketplaceSlice";
import { Filter, Search, RotateCcw, ChevronDown, Check } from "lucide-react";

/**
 * ProductFilters
 * A sleek marketplace sidebar for searching, categorizing, and filtering products.
 */
export default function ProductFilters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.marketplace);
  
  const categories = ["All", "Electronics", "Accessories", "Audio", "Wearables"];
  const [selectedCat, setSelectedCat] = useState(filters.category);

  const handleCategoryChange = (cat) => {
    setSelectedCat(cat);
    dispatch(setFilters({ category: cat }));
  };

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  return (
    <div className="bg-white dark:bg-[#171f33] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-10 sticky top-28 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white">
          <Filter className="w-5 h-5 text-indigo-500" />
          <h3 className="font-black text-xs uppercase tracking-widest">Filters</h3>
        </div>
        <button 
          onClick={() => dispatch(clearFilters())}
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all active:scale-90"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em] ml-1">
          Quick Find
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-xs bg-slate-50 dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/20 text-slate-800 dark:text-[#dae2fd] transition-all"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em] ml-1">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all group ${
                selectedCat === cat 
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 translate-x-2" 
                : "text-slate-500 dark:text-[#dae2fd]/40 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              {cat}
              {selectedCat === cat && <Check size={14} className="animate-in fade-in zoom-in duration-300" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex items-center justify-between ml-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em]">
            Price Range
          </label>
          <span className="text-[10px] font-black text-indigo-500 tracking-widest">${filters.maxPrice}</span>
        </div>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50"
            className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500 transition-all hover:scale-y-125"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setFilters({ maxPrice: parseInt(e.target.value) }))}
          />
          <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 dark:text-[#dae2fd]/10 tracking-widest uppercase">
            <span>$0</span>
            <span>$2K+</span>
          </div>
        </div>
      </div>

      {/* Promo Card */}
      <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-900 text-white relative overflow-hidden group/promo">
        <div className="relative z-10 space-y-2">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-60">Limited Offer</p>
          <h4 className="text-sm font-bold tracking-tight">Free shipping on orders over $500</h4>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-transform group-hover/promo:scale-150 duration-700"></div>
      </div>
    </div>
  );
}
