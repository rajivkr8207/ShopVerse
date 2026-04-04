"use client";

import React from "react";
import Image from "next/image";
import { MoveRight, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    sales: 1240,
    status: "In Stock",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=80&h=80&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "Wearables",
    price: 199.99,
    sales: 850,
    status: "Low Stock",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 499.00,
    sales: 420,
    status: "In Stock",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=80&h=80&fit=crop"
  }
];

const TopProducts = () => {
  return (
    <div className="bg-white dark:bg-[#171f33] p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-[#dae2fd]">Top Selling Products</h3>
          <p className="text-sm text-slate-500 dark:text-[#dae2fd]/40">Best performing items this month</p>
        </div>
        <button className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl group transition-all duration-300 hover:scale-110 active:scale-95">
          <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5">
              <th className="text-left py-4 text-xs font-bold text-slate-500 dark:text-[#dae2fd]/20 uppercase tracking-widest pl-2">Product</th>
              <th className="text-left py-4 text-xs font-bold text-slate-500 dark:text-[#dae2fd]/20 uppercase tracking-widest px-4">Sales</th>
              <th className="text-left py-4 text-xs font-bold text-slate-500 dark:text-[#dae2fd]/20 uppercase tracking-widest px-4">Price</th>
              <th className="text-left py-4 text-xs font-bold text-slate-500 dark:text-[#dae2fd]/20 uppercase tracking-widest px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200 border-b last:border-0 border-slate-50 dark:border-white/5">
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 group-hover:ring-indigo-500 transition-all shadow-sm">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-[#dae2fd]">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500 dark:text-[#dae2fd]/40">{product.category}</span>
                        <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-slate-900 dark:text-[#dae2fd]">{product.sales.toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-slate-900 dark:text-[#dae2fd]">${product.price}</td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide ${
                    product.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                  }`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
