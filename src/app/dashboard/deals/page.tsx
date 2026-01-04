import { getPipelineData } from "@/lib/actions/crm.actions";
import PipelineBoard from "@/components/PipelineBoard";

export default async function DealsPage() {
  const { deals, metrics } = await getPipelineData();

  return (
    <div className="space-y-8">
      {/* Metrics Bar - High Clarity */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase">Open Pipeline</p>
          <p className="text-2xl font-black text-blue-600">{metrics.totalOpenValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase">Active Deals</p>
          <p className="text-2xl font-black text-slate-800">{metrics.openCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm border-l-4 border-l-green-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Won</p>
          <p className="text-2xl font-black text-green-600">{metrics.wonCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm border-l-4 border-l-red-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Lost</p>
          <p className="text-2xl font-black text-red-600">{metrics.lostCount}</p>
        </div>
      </div>

      <PipelineBoard deals={deals} />
    </div>
  );
}