"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Plus, 
  MapPinOff,
  Star,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2
} from "lucide-react";

// Mock Data
const initialAddresses = [
  {
    id: 1,
    name: "Jane Doe",
    address: "123 Observer St, Apt 4",
    city: "Neo Tokyo",
    postalCode: "90210",
    isDefault: true
  },
  {
    id: 2,
    name: "Jane Doe",
    address: "456 Sector 7G, Cyber District",
    city: "Night City",
    postalCode: "NC-7781",
    isDefault: false
  }
];

const MyAddresses = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleRemove = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
            Secure <span className="text-indigo-500">Logistics.</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest mt-4">Manage your delivery vectors and secure dropsites</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
         {/* Add New Address Card */}
         {!isAddingMode ? (
           <button 
             onClick={() => setIsAddingMode(true)}
             className="flex flex-col items-center justify-center gap-4 min-h-[250px] rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 group active:scale-95"
           >
             <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all">
               <Plus size={24} />
             </div>
             <span className="text-sm font-black uppercase tracking-widest">Add Vector</span>
           </button>
         ) : (
           <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-[#171f33] p-8 rounded-[2rem] border border-indigo-500/50 shadow-2xl shadow-indigo-500/10 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-indigo-500" size={24} />
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Register New Vector</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input type="text" placeholder="Receiver Name" className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                 <input type="text" placeholder="Sector Code (ZIP)" className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                 <input type="text" placeholder="Secure Axis (Address)" className="md:col-span-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                 <input type="text" placeholder="City Hub" className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                 <button onClick={() => setIsAddingMode(false)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 uppercase tracking-widest transition-all">Cancel</button>
                 <button onClick={() => setIsAddingMode(false)} className="px-6 py-3 rounded-xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-95 transition-all">Save Vector</button>
              </div>
           </div>
         )}

         {/* Saved Addresses */}
         {addresses.map(address => (
           <div key={address.id} className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 group overflow-hidden ${address.isDefault ? 'bg-slate-900 dark:bg-[#171f33] border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : 'bg-white dark:bg-[#171f33] border-slate-200 dark:border-white/5 hover:border-indigo-500/30'}`}>
              
              {address.isDefault && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-[1rem]">Primary</div>
              )}

              <div className="flex-1 space-y-4">
                 <div className="flex items-start justify-between">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${address.isDefault ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                     <MapPin size={20} />
                   </div>
                   
                   {/* Actions Menu */}
                   <div className="flex gap-2">
                     {!address.isDefault && (
                       <button onClick={() => handleSetDefault(address.id)} className="p-1.5 text-slate-400 hover:text-emerald-500 transition-colors" title="Set Default">
                         <CheckCircle2 size={16} />
                       </button>
                     )}
                     <button className="p-1.5 text-slate-400 hover:text-indigo-500 transition-colors" title="Edit">
                       <Edit2 size={16} />
                     </button>
                     <button onClick={() => handleRemove(address.id)} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors" title="Remove">
                       <Trash2 size={16} />
                     </button>
                   </div>
                 </div>

                 <div className={`pt-2 ${address.isDefault ? 'text-slate-100 dark:text-white' : 'text-slate-800 dark:text-white'}`}>
                   <h4 className="text-lg font-bold uppercase tracking-tight">{address.name}</h4>
                   <p className="text-sm font-medium opacity-70 mt-1">{address.address}</p>
                   <p className="text-sm font-medium opacity-70">{address.city}, {address.postalCode}</p>
                 </div>
              </div>
           </div>
         ))}

         {addresses.length === 0 && !isAddingMode && (
             <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center min-h-[250px] bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-200 dark:border-white/5 border-dashed">
               <MapPinOff className="w-12 h-12 text-slate-300 dark:text-white/10 mb-2" />
               <p className="text-sm font-bold text-slate-500 dark:text-[#dae2fd]/40 uppercase tracking-widest">No Saved Vectors</p>
             </div>
         )}
      </div>
    </div>
  );
};

export default MyAddresses;
