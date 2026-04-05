"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import ProductCard from "@/features/marketplace/components/ProductCard";
import ProductFilters from "@/features/marketplace/components/ProductFilters";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function MarketplacePage() {
  const { products, filters, loading } = useSelector((state) => state.marketplace);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === "All" || p.category === filters.category;
      const matchPrice = p.price <= filters.maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, filters]);

  return (
    <ProtectedRoute requiredRole="USER">
      <MarketplaceLayout>
        <div className="space-y-12 animate-in fade-in duration-700">

          {/* Market Header Hero */}
          <div className="relative rounded-[2.5rem] bg-slate-900 border border-white/5 overflow-hidden p-12 lg:p-20 group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500 blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-1000"></div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest animate-bounce">
                <Sparkles size={14} /> New Season Collection
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter italic leading-[0.9] uppercase">
                Next-Gen <br /> <span className="text-indigo-400">Hardware</span> Suite.
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                The ultimate destination for premium obsidian-coated electronics and accessories. Designed for excellence.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center gap-3 group">
                  View Collections
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShoppingBag size={300} className="text-white -rotate-12 translate-x-1/4 translate-y-1/4" />
            </div>
          </div>

          {/* Marketplace Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">
                  Discovery Grid
                  <span className="ml-3 text-xs font-bold text-slate-400 dark:text-[#dae2fd]/20 not-italic uppercase tracking-widest">
                    {filteredProducts.length} Results
                  </span>
                </h2>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-40 text-center space-y-4 bg-white dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">No products found</h3>
                  <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </MarketplaceLayout>
    </ProtectedRoute>
  );
}
