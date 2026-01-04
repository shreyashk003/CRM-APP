export const runtime = "nodejs";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Trello, 
  ShieldCheck, 
  LogOut 
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const role = session.user.role;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full">
        <div className="px-6 py-8">
          <div className="flex items-center gap-2 text-white text-2xl font-bold tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building2 size={20} />
            </div>
            <span>SalesCRM</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
          
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavLink href="/dashboard/deals" icon={<Trello size={18} />} label="Pipeline" />
          <NavLink href="/dashboard/companies" icon={<Building2 size={18} />} label="Companies" />
          <NavLink href="/dashboard/contacts" icon={<Users size={18} />} label="Contacts" />

          {role === "manager" && (
            <>
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">Admin</p>
              <NavLink href="/dashboard/manager" icon={<ShieldCheck size={18} />} label="Manager Panel" color="text-amber-400" />
            </>
          )}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white uppercase">
              {session.user.email?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{session.user.email}</p>
              <p className="text-xs text-slate-500 capitalize">{role}</p>
            </div>
          </div>
          
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content - Adjusted margin for fixed sidebar */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Small helper component for navigation links
function NavLink({ href, icon, label, color = "text-inherit" }: { href: string; icon: any; label: string; color?: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-all ${color}`}
    >
      {icon}
      {label}
    </Link>
  );
}