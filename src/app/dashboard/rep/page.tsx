export const runtime = "nodejs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RepDashboard() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Rep Dashboard
      </h1>

      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-gray-600">
          View and manage your assigned companies, contacts, and deals.
        </p>
      </div>
    </div>
  );
}
