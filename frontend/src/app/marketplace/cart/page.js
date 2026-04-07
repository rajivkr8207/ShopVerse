"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeItem, updateQuantity } from "@/features/marketplace/cartSlice";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
  ChevronLeft,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  if (items.length === 0) {
    return (
      <MarketplaceLayout>
        <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-in fade-in duration-700">
          <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
            <ShoppingBag size={48} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Your Bag is Empty</h2>
            <p className="text-slate-500 dark:text-[#dae2fd]/40 font-medium">Continue browsing to add high-end units to your selection.</p>
          </div>
          <Link
            href="/marketplace"
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
          >
            Start Discovery
          </Link>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest hover:text-indigo-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Browsing
          </button>
          <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">Bag Securing - Step 1 of 3</p>
        </div>

        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
          Shopping <span className="text-indigo-500">Summary.</span>
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start pb-20">

          {/* Main Cart Items Area */}
          <div className="xl:col-span-2 space-y-4">
            <div className="bg-white dark:bg-[#171f33] rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden">
              <div className="px-8 py-6 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 grid grid-cols-12 gap-4 text-[10px] font-black text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest">
                <span className="col-span-6">Unit Description</span>
                <span className="col-span-3 text-center">Quantity Control</span>
                <span className="col-span-3 text-right">Total Investment</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {items.map((item) => (
                  <div key={item.id} className="p-8 grid grid-cols-12 gap-6 items-center group transition-all hover:bg-slate-50/50 dark:hover:bg-white/5">

                    {/* Item Info */}
                    <div className="col-span-12 md:col-span-6 flex items-center gap-6">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 shadow-lg shadow-indigo-500/5 transition-transform group-hover:scale-105 duration-500">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.category}</p>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{item.name}</h4>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest flex items-center gap-1.5 pt-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="col-span-6 md:col-span-3">
                      <div className="flex items-center justify-center gap-6 p-2 rounded-2xl bg-slate-100 dark:bg-[#0b1326] border border-slate-200 dark:border-white/5 w-fit mx-auto">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                          className="p-1.5 bg-white dark:bg-[#171f33] rounded-xl text-slate-400 hover:text-indigo-500 transition-all active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-black text-slate-800 dark:text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="p-1.5 bg-white dark:bg-[#171f33] rounded-xl text-slate-400 hover:text-indigo-500 transition-all active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-6 md:col-span-3 text-right">
                      <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-[#dae2fd]/20 uppercase tracking-widest">
                        ${item.price} / unit
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout / Summary Panel */}
          <div className="xl:col-span-1 space-y-8 sticky top-28">
            <div className="bg-white dark:bg-[#171f33] p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 space-y-10 shadow-2xl shadow-indigo-500/5">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Order Value</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                    <span>Total Subtotal</span>
                    <span className="text-slate-800 dark:text-white">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                    <span>Priority Shipping</span>
                    <span className="text-emerald-500 font-black">Complementary</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                    <span>Estimated Sales Tax</span>
                    <span className="text-slate-800 dark:text-white">Calculated at Checkout</span>
                  </div>
                </div>
                <div className="h-px bg-slate-100 dark:bg-white/5 my-6"></div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Grand Total</span>
                  <span className="text-4xl font-black text-indigo-500 tracking-tighter italic leading-none truncate ml-4">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <button
                  onClick={() => router.push("/marketplace/checkout")}
                  className="w-full h-16 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-800 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                  Proceed to Secure Checkout
                  <CreditCard size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
                <p className="text-[10px] text-center font-bold text-slate-400 dark:text-[#dae2fd]/20 uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck size={12} className="text-indigo-400" /> AES-256 Bit Encryption Active
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex flex-col items-center gap-2 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Truck size={24} className="text-slate-300 dark:text-[#dae2fd]/10" />
                  <p className="text-[8px] font-black uppercase text-slate-400 dark:text-[#dae2fd]/10 tracking-widest">Global Logistics</p>
                </div>
                <div className="flex flex-col items-center gap-2 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <RotateCcw size={24} className="text-slate-300 dark:text-[#dae2fd]/10" />
                  <p className="text-[8px] font-black uppercase text-slate-400 dark:text-[#dae2fd]/10 tracking-widest">Obsidian Insurance</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-[#dae2fd]/60 leading-relaxed italic">
                "Our obsidian structural integrity guarantee ensures your hardware reaches you in pristine condition by our logistics partners."
              </p>
            </div>
          </div>

        </div>
      </div>
    </MarketplaceLayout>
  );
}
