"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag,
  ArrowRight,
  Package
} from "lucide-react";
import Link from "next/link";

const Checkout = () => {
  const router = useRouter();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep(3);
    // In a real app, dispatch to a Redux action / API call here
    // Also clear the cart eventually.
  };

  // If cart is empty, redirect or show message (assuming cart state loaded)
  if (items.length === 0 && step !== 3) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Cannot Checkout</h2>
          <p className="text-slate-500 dark:text-[#dae2fd]/40 font-medium">Your bag is currently empty.</p>
        </div>
        <Link 
          href="/marketplace"
          className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  // Success Step
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-20 px-4 space-y-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
        <div className="relative">
          <div className="w-40 h-40 bg-emerald-500/20 rounded-full animate-pulse absolute -inset-4 blur-2xl"></div>
          <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white relative shadow-2xl shadow-emerald-500/30 ring-8 ring-emerald-500/20">
            <CheckCircle2 size={64} className="animate-in zoom-in duration-500 delay-300" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <p className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em]">Transaction Complete</p>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">
            Order Secure.
          </h2>
          <p className="text-slate-500 dark:text-[#dae2fd]/40 font-medium max-w-md mx-auto pt-4 leading-relaxed">
            Your hardware has been secured. An encrypted receipt has been dispatched to your designated frequency.
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/marketplace/orders"
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-[#0b1326] rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
          >
            Track Order
          </Link>
          <Link 
            href="/marketplace"
            className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 transition-all border border-slate-200 dark:border-white/5"
          >
            Continue Discovery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs font-black text-slate-500 dark:text-[#dae2fd]/50 uppercase tracking-widest hover:text-indigo-500 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Bag
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
            Secure <span className="text-indigo-500">Checkout.</span>
          </h1>
        </div>
        
        {/* Progress Tracker */}
        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-500' : 'text-slate-400 dark:text-white/20'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-white/5'}`}>1</div>
              <span className="hidden sm:inline">Shipping</span>
           </div>
           <div className="w-8 h-px bg-slate-200 dark:bg-white/10"></div>
           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-500' : 'text-slate-400 dark:text-white/20'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-white/5'}`}>2</div>
              <span className="hidden sm:inline">Payment</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start pb-20">
        
        {/* Left Form Area */}
        <div className="xl:col-span-2 space-y-8">
          
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
               <div className="bg-white dark:bg-[#171f33] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-indigo-500/5 space-y-8">
                  <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Logistics Data</h2>
                      <p className="text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">Where should we deploy your hardware?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">First Name</label>
                       <input required type="text" name="firstName" value={shippingInfo.firstName} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">Last Name</label>
                       <input required type="text" name="lastName" value={shippingInfo.lastName} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30" placeholder="Doe" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">Secure Axis (Address)</label>
                       <input required type="text" name="address" value={shippingInfo.address} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30" placeholder="123 Observer St, Apt 4" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">City Hub</label>
                       <input required type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30" placeholder="Neo Tokyo" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">Sector Code (ZIP)</label>
                       <input required type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all placeholder:text-slate-400 dark:placeholder:text-[#dae2fd]/30" placeholder="90210" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end">
                    <button type="submit" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:scale-95 group">
                      Proceed to Payment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
               </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
               <div className="bg-white dark:bg-[#171f33] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-indigo-500/5 space-y-8">
                  <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Payment Transmission</h2>
                      <p className="text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">Select your secure payment vector</p>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 ${paymentMethod === 'credit-card' ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-white/10 hover:border-indigo-500/30 dark:hover:bg-white/5'}`}>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={() => setPaymentMethod('credit-card')} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                           <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">Credit Card</span>
                         </div>
                         <CreditCard size={20} className="text-slate-400" />
                      </div>
                    </label>
                    
                    <label className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 ${paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-white/10 hover:border-indigo-500/30 dark:hover:bg-white/5'}`}>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                           <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">PayPal</span>
                         </div>
                         <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 font-black italic">P</div>
                      </div>
                    </label>
                  </div>

                  {/* Mock Credit Card Form */}
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5 animate-in fade-in zoom-in-95">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">Card Number</label>
                         <div className="relative">
                            <input required type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all text-slate-800 dark:text-white tabular-nums tracking-widest" placeholder="0000 0000 0000 0000" />
                            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">Expiry Date</label>
                           <input required type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all text-center tabular-nums tracking-widest" placeholder="MM/YY" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest pl-2">CVC / Security</label>
                           <input required type="password" maxLength="4" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#171f33] transition-all text-center tabular-nums tracking-widest" placeholder="***" />
                         </div>
                       </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-500 hover:text-indigo-500 uppercase tracking-widest transition-colors flex items-center gap-2">
                      <ChevronLeft size={16} /> Return to Shipping
                    </button>
                    <button type="submit" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">Authorize Transact <ShieldCheck size={16} /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
               </div>
            </form>
          )}

        </div>

        {/* Right Summary Area */}
        <div className="xl:col-span-1 space-y-8 sticky top-28">
           <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 space-y-8 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <Package className="text-indigo-500" size={24} />
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Order Manifest</h3>
              </div>
              
              {/* Items List */}
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate uppercase tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-black text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest leading-none mt-1">QTY: {item.quantity}</p>
                      <p className="text-sm font-black text-indigo-500 tracking-tighter italic mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/10 my-4"></div>

              {/* Totals */}
              <div className="space-y-3 pb-4">
                 <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                   <span>Unit Value</span>
                   <span className="text-slate-800 dark:text-white">${totalAmount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                   <span>Transport</span>
                   <span className="text-emerald-500 font-black">+ $0.00</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">
                   <span>Tax Access</span>
                   <span className="text-rose-500">+ ${(totalAmount * 0.08).toLocaleString()}</span>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                 <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Net Total</span>
                 <span className="text-3xl font-black text-indigo-500 tracking-tighter italic leading-none">
                   ${(totalAmount * 1.08).toLocaleString()}
                 </span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
