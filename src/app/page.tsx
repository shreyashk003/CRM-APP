import Link from "next/link";
import { 
  BarChart3, 
  Building2, 
  Users, 
  ArrowRight,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Globe,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 font-sans selection:text-emerald-400">
      
      {/* --- Modern Glow Navigation --- */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
              <Database className="text-slate-950" size={22} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">BIMOMETRIK<span className="text-emerald-500">_</span>CRM</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* --- Hero Section with Spotlight --- */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20">
          {/* Spotlight Effect */}
          <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-10">
              <ShieldCheck size={14} />
              Bimometrik Systems CRM Project
            </div>
            
            <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl mb-8">
              Sales intelligence <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">reimagined.</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              A lightweight, high-performance Sales CRM built for the <span className="text-white font-semibold">Bimometrik Systems</span> assignment. 
              Seamlessly manage leads, track contacts, and master your deal pipeline.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link href="/register" className="group flex h-16 items-center gap-3 rounded-2xl bg-emerald-500 px-10 text-lg font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)] active:scale-95">
                Start Managing Deals
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/login" className="flex h-16 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/50 px-10 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600 active:scale-95">
                Acccess Dashboard
              </Link>
            </div>
          </div>

          {/* --- Abstract Dashboard Visual --- */}
          <div className="mx-auto mt-24 max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-sm shadow-2xl">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8 overflow-hidden">
               <div className="flex gap-4 mb-8">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-48 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 relative overflow-hidden group">
                       <div className="h-2 w-16 rounded bg-slate-800 mb-4" />
                       <div className="space-y-3">
                          <div className="h-16 w-full rounded-xl bg-slate-800/40 border border-slate-700/50 p-3">
                             <div className="h-2 w-1/2 bg-emerald-500/20 rounded mb-2" />
                             <div className="h-2 w-3/4 bg-slate-700 rounded" />
                          </div>
                          <div className="h-12 w-full rounded-xl bg-slate-800/20 border border-slate-800 p-3 opacity-40">
                             <div className="h-2 w-1/3 bg-slate-800 rounded" />
                          </div>
                       </div>
                       <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* --- Feature Bento Grid --- */}
        <section className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-900">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-10 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
              <div>
                <LayoutDashboard className="text-emerald-400 mb-6" size={40} />
                <h3 className="text-3xl font-bold text-white mb-4">6-Stage Pipeline</h3>
                <p className="text-slate-400 text-lg max-w-md">Master the deal flow from "New" to "Won". Visualize your entire sales cycle in a single, beautiful Kanban view.</p>
              </div>
              <div className="mt-8 flex gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-emerald-400">QUALIFIED</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-emerald-400">PROPOSAL</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-emerald-400">WON</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] bg-slate-900/50 border border-slate-800 p-8 hover:border-emerald-500/50 transition-colors">
                <Users className="text-cyan-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">360° Contacts</h4>
                <p className="text-slate-400 text-sm">Link multiple contacts to organizations and track their engagement history.</p>
              </div>
              <div className="rounded-[2rem] bg-slate-900/50 border border-slate-800 p-8 hover:border-emerald-500/50 transition-colors">
                <BarChart3 className="text-blue-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">Real-time Metrics</h4>
                <p className="text-slate-400 text-sm">Aggregated deal values and performance analytics updated with every move.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Simple Professional Footer --- */}
      <footer className="border-t border-slate-900 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-emerald-500" />
            <p className="text-sm font-bold text-slate-500">BIMOMETRIK SYSTEMS ASSIGNMENT</p>
          </div>
          <p className="text-xs font-mono text-slate-600 uppercase tracking-tighter">
            Next.js 15 // Tailwind CSS // Lucide // MongoDB
          </p>
        </div>
      </footer>
    </div>
  );
}