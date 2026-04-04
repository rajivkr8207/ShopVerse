"use client";

import React, { useState } from "react";
import Header from "@/features/seller/components/Header";
import Sidebar from "@/features/seller/components/Sidebar";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * MarketplaceLayout
 * A common layout for all marketplace-related pages, including the cart interaction.
 */
export default function MarketplaceLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="flex h-screen bg-white dark:bg-[#0b1326] transition-colors duration-300 overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0b1326] p-8 custom-scrollbar">
          {children}
        </main>

        {/* Floating Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-10 right-10 w-20 h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl shadow-indigo-600/40 flex items-center justify-center transition-all hover:scale-110 active:scale-90 group z-50 border-4 border-white dark:border-[#0b1326]"
        >
          <div className="relative">
            <ShoppingCart size={28} className="group-hover:rotate-12 transition-transform" />
            {totalQuantity > 0 && (
              <span className="absolute -top-3 -right-3 w-7 h-7 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-white dark:border-[#0b1326] animate-in zoom-in duration-300">
                {totalQuantity}
              </span>
            )}
          </div>
        </button>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </div>
  );
}
