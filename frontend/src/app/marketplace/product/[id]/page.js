"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "@/features/marketplace/cartSlice";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import { 
  ChevronLeft, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.marketplace);

  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id, products]);

  if (!product) {
    return (
      <MarketplaceLayout>
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full mb-6"></div>
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <button 
            onClick={() => router.push("/marketplace")}
            className="mt-6 text-indigo-500 font-bold border-b border-indigo-500/20"
          >
            Back to Marketplace
          </button>
        </div>
      </MarketplaceLayout>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, {
      icon: <ShoppingCart size={20} className="text-white" />,
      className: "bg-indigo-600 text-white rounded-2xl shadow-2xl",
    });
  };

  return (
    <MarketplaceLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl mx-auto">
        
        {/* Navigation / Breadcrumb */}
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-xs font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest hover:text-indigo-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Gallery / Image Area */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[3rem] bg-white dark:bg-[#171f33] border border-slate-200 dark:border-white/5 overflow-hidden group shadow-2xl shadow-indigo-500/5">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 opacity-40 hover:opacity-100 transition-all cursor-pointer"></div>
               ))}
            </div>
          </div>

          {/* Product Info Area */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star size={14} className="fill-amber-500" />
                  <span className="text-xs font-black tracking-widest uppercase">{product.rating} / 5.0</span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-lg text-slate-500 dark:text-[#dae2fd]/40 font-medium leading-relaxed max-w-lg italic">
                "{product.description}"
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em]">Retail Price</p>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                ${product.price.toLocaleString()}
              </h2>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-6 p-2 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <button className="p-3 bg-white dark:bg-[#0b1326] rounded-2xl text-slate-400 hover:text-indigo-500 transition-all active:scale-90">
                  <Minus size={20} />
                </button>
                <span className="text-lg font-black text-slate-900 dark:text-white w-6 text-center">1</span>
                <button className="p-3 bg-white dark:bg-[#0b1326] rounded-2xl text-slate-400 hover:text-indigo-500 transition-all active:scale-90">
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] h-16 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-800 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                Secure Unit
                <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <p className="text-[10px] font-bold text-slate-400 dark:text-[#dae2fd]/40 uppercase tracking-widest">3 Year Warranty</p>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-indigo-500" />
                <p className="text-[10px] font-bold text-slate-400 dark:text-[#dae2fd]/40 uppercase tracking-widest">Priority Delivery</p>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-indigo-500" />
                <p className="text-[10px] font-bold text-slate-400 dark:text-[#dae2fd]/40 uppercase tracking-widest">Free Obsidian Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications / Content */}
        <div className="bg-white dark:bg-[#171f33] p-12 lg:p-20 rounded-[3rem] border border-slate-200 dark:border-white/5 space-y-12">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Technical Specification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Core Material", value: "Obsidian Polycarbonate" },
                { label: "Connectivity", value: "Aether Wireless v5.4" },
                { label: "Battery Life", value: "120 Hours Active" },
                { label: "Tactile Response", value: "Instant (0.1ms)" },
              ].map((spec, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-[0.2em]">{spec.label}</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">{spec.value}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-500 dark:text-[#dae2fd]/30 text-sm font-medium leading-relaxed max-w-4xl py-6 border-t border-slate-200 dark:border-white/5">
              The {product.name} underwent extensive laboratory testing to ensure perfect obsidian structural integrity and peak visual fidelity. Built for store managers who demand zero compromises on quality, this unit represents the zenith of contemporary industrial design.
            </p>
        </div>
      </div>
    </MarketplaceLayout>
  );
}
