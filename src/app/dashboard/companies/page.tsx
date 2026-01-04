import { getCompanies, getContacts } from "@/lib/actions/crm.actions";
import Link from "next/link";
import { Building2, Users, ArrowRight, Plus } from "lucide-react";

export default async function CompaniesPage() {
  // Fetching both for the metrics bar
  const companies = await getCompanies();
  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      {/* Header & Primary Action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Company Management</h1>
          <p className="text-slate-500">Manage corporate partners and linked recruitment contacts.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md">
          <Plus size={18} /> Add Company
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Companies</p>
            <p className="text-2xl font-bold text-slate-900">{companies.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Linked Contacts</p>
            <p className="text-2xl font-bold text-slate-900">{contacts.length}</p>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      {(!companies || companies.length === 0) ? (
        <div className="p-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No company records found in your directory.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company: any) => (
            <div key={company._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-slate-900">{company.name}</h3>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {company.industry || "Uncategorized"}
                  </span>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-sm text-slate-500 gap-2">
                    <span className="opacity-70">📧</span> {company.email || 'No email provided'}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 gap-2">
                    <span className="opacity-70">📞</span> {company.phone || 'No phone provided'}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-100">
                <Link 
                  href={`/dashboard/companies/${company._id}`}
                  className="flex items-center justify-center gap-2 w-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  View 360° Profile <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}