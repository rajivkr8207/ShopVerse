"use client";

import React from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../cartSlice";
import { toast } from "react-toastify";
import Link from "next/link";

/**
 * ProductCard
 * A premium glassmorphic product card with dynamic hover effects and quick actions.
 */
export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, {
      icon: <ShoppingCart className="text-indigo-500" />,
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#171f33] rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
      
      {/* Product Image Area */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays & Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
          <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-rose-500 hover:border-rose-500 transition-all">
            <Heart size={18} />
          </button>
          <Link href={`/marketplace/product/${product.id}`} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all">
            <Eye size={18} />
          </Link>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
          <Star size={12} className="fill-white" />
          {product.rating}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="text-xl font-bold text-slate-800 dark:text-[#dae2fd] leading-tight group-hover:text-indigo-500 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40 font-medium">Price</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              ${product.price.toLocaleString()}
            </p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 group/btn"
          >
            <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interaction Glow */}
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
}
