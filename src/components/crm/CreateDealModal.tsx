"use client";

import { useState } from "react";
import { createDeal } from "@/lib/actions/crm.actions";
import { X, Plus, DollarSign, Building2, Briefcase } from "lucide-react";

export default function CreateDealModal({ companies }: { companies: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createDeal(formData);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
    >
      <Plus size={18} /> New Deal
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-emerald-400" size={20} /> Create New Deal
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Deal Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Deal Title</label>
            <div className="relative">
              <input 
                name="title" 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition"
                placeholder="e.g. Q1 Software License"
              />
            </div>
          </div>

          {/* Deal Value */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Deal Value ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><DollarSign size={16}/></span>
              <input 
                name="value" 
                type="number" 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-emerald-500 transition"
                placeholder="5000"
              />
            </div>
          </div>

          {/* Company Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Associate Company</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><Building2 size={16}/></span>
              <select 
                name="companyId" 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-emerald-500 appearance-none cursor-pointer"
              >
                <option value="">Select a company</option>
                {companies.map(company => (
                  <option key={company._id} value={company._id}>{company.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Processing..." : "Confirm & Launch Deal"}
          </button>
        </form>
      </div>
    </div>
  );
}