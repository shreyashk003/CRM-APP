import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
      <div className="flex gap-8 items-center">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">AI CRM</Link>
        <div className="flex gap-4 text-sm font-medium text-slate-600">
          <Link href="/dashboard" className="hover:text-blue-600">Deals</Link>
          <Link href="/companies" className="hover:text-blue-600">Companies</Link>
          <Link href="/contacts" className="hover:text-blue-600">Contacts</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-500">{session?.user?.email} ({session?.user?.role})</span>
        <form action={async () => { "use server"; await signOut(); }}>
          <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}