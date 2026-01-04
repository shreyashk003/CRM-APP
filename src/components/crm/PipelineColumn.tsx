"use client";
import { updateDealStage } from "@/lib/actions/crm.actions";
import { useRouter } from "next/navigation";

export default function PipelineColumn({ title, deals }: { title: string, deals: any[] }) {
  const router = useRouter();

  const handleMove = async (dealId: string, nextStage: string) => {
    await updateDealStage(dealId, nextStage);
    router.refresh(); // Refresh server data
  };

  return (
    <div className="flex-shrink-0 w-80 flex flex-col bg-slate-900/30 rounded-3xl border border-slate-800/50 p-4">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="font-bold text-slate-300 uppercase text-xs tracking-[0.2em]">{title}</h3>
        <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full font-mono">
          {deals.length}
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto pr-1">
        {deals.map((deal) => (
          <div 
            key={deal._id}
            className="group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.1)]"
          >
            <p className="text-sm font-bold text-white mb-1">{deal.title}</p>
            <p className="text-xs text-slate-500 mb-4">{deal.companyId?.name || "Independent Deal"}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 font-black text-sm">
                ${deal.value.toLocaleString()}
              </span>
              
              {/* Simple stage switcher for demo (Replace with DnD if time permits) */}
              <select 
                className="bg-slate-800 text-[10px] text-slate-400 border-none rounded-md px-1 py-0.5 outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                onChange={(e) => handleMove(deal._id, e.target.value)}
                value={title}
              >
                {["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {deals.length === 0 && (
          <div className="py-10 text-center border-2 border-dashed border-slate-800/50 rounded-2xl">
             <p className="text-slate-600 text-xs font-medium uppercase tracking-widest">Empty Stage</p>
          </div>
        )}
      </div>
    </div>
  );
}