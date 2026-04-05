"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../cartSlice";
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShoppingBasket
} from "lucide-react";
import Link from "next/link";

/**
 * CartDrawer
 * A high-end sliding drawer for managing cart items and visualizing the checkout journey.
 */
export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.items ? state.cart : state.cart); 
  // Safety check for state shape

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Drawer Content */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-[#0b1326] shadow-2xl border-l border-slate-200 dark:border-white/5 flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <ShoppingBasket size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Shopping Bag</h2>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{totalQuantity} Items Secured</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 transition-all hover:rotate-90 active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBag size={48} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Your bag is empty</h3>
                <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group relative flex items-center gap-5 p-4 rounded-3xl bg-slate-50 dark:bg-[#171f33] border border-slate-100 dark:border-white/5 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{item.name}</h4>
                    <button 
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 p-1.5 rounded-xl bg-white dark:bg-[#0b1326] border border-slate-200 dark:border-white/5">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-black w-4 text-center text-slate-800 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-8 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-emerald-500">Calculated later</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-white/5 my-4"></div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Total Amount</span>
                <span className="text-2xl font-black text-indigo-500 tracking-tighter">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => dispatch(clearCart())}
                className="h-14 w-14 bg-white dark:bg-[#171f33] border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/20 transition-all active:scale-90"
              >
                <Trash2 size={20} />
              </button>
              <Link
                href="/marketplace/cart"
                onClick={onClose}
                className="flex-1 h-14 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
              >
                Checkout Securely
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
