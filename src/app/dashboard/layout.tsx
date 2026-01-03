export const runtime = "nodejs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const role = session.user.role;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="border-b px-6 py-4 text-xl font-bold">
          CRM
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          {role === "manager" && (
            <Link
              href="/dashboard/manager"
              className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Manager Panel
            </Link>
          )}

          <Link
            href="/dashboard/rep"
            className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Work
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
