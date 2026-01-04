import { getContacts } from "@/lib/actions/crm.actions";
import Link from "next/link";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Name</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Email</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Company</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {contacts.map((contact: any) => (
            <tr key={contact._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{contact.name}</td>
              <td className="px-6 py-4 text-slate-500">{contact.email}</td>
              <td className="px-6 py-4">
                <Link href={`/dashboard/companies/${contact.companyId?._id}`} className="text-blue-600 hover:underline">
                  {contact.companyId?.name || "Unlinked"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}