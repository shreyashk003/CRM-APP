export const runtime = "nodejs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ManagerDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "manager") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Companies</p>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Deals</p>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>
      </div>
    </div>
  );
}
