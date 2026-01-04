import { getPipelineData, getCompanies } from "@/lib/actions/crm.actions";
import PipelineColumn from "@/components/crm/PipelineColumn";
import CreateDealModal from "@/components/crm/CreateDealModal";
import { TrendingUp, Target, CheckCircle2 } from "lucide-react";

const STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export default async function PipelinePage() {
  // Fetch deals, metrics, and companies for the modal
  const { deals, metrics } = await getPipelineData();
  const companies = await getCompanies();

  return (
    <div className="flex flex-col min-h-screen space-y-8 p-8 bg-slate-950 text-white">
      
      {/* --- Top Header & Action Bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-emerald-500" size={20} />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.3em]">Live Pipeline</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">Sales Pipeline</h1>
          <p className="text-slate-500 font-medium">Bimometrik Systems • Portfolio Overview</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Performance Summary Badges */}
          <div className="flex gap-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-2xl border border-slate-800/50">
             <div className="px-4 py-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Won</p>
                <p className="text-lg font-black text-emerald-400">{metrics.wonCount}</p>
             </div>
             <div className="px-4 py-2 border-l border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Lost</p>
                <p className="text-lg font-black text-red-400">{metrics.lostCount}</p>
             </div>
          </div>

          {/* New Deal Trigger */}
          <CreateDealModal companies={companies} />
        </div>
      </div>

      {/* --- Aggregated Global Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-transparent p-6 rounded-3xl border border-emerald-500/20">
          <TrendingUp className="absolute right-6 top-6 text-emerald-500/20" size={48} />
          <p className="text-xs font-bold text-emerald-500/70 uppercase tracking-widest mb-1">Total Open Value</p>
          <p className="text-3xl font-black text-white">${metrics.totalOpenValue.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {metrics.openCount} deals currently in negotiation
          </div>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Win Rate</p>
            <p className="text-3xl font-black text-white">
              {metrics.wonCount + metrics.lostCount > 0 
                ? Math.round((metrics.wonCount / (metrics.wonCount + metrics.lostCount)) * 100) 
                : 0}%
            </p>
          </div>
          <CheckCircle2 size={40} className="text-slate-800" />
        </div>
      </div>

      {/* --- Kanban Board (Horizontal Scroll) --- */}
      
      <div className="flex flex-1 gap-6 overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d: any) => d.stage === stage);
          const stageValue = stageDeals.reduce((acc: number, d: any) => acc + (d.value || 0), 0);

          return (
            <PipelineColumn 
              key={stage} 
              title={stage} 
              deals={stageDeals}             />
          );
        })}
      </div>
    </div>
  );
}