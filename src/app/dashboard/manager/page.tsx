export const runtime = "nodejs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ManagerDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "manager") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Manager Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow">
            Total Leads
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            Active Reps
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            Revenue
          </div>
        </div>
      </div>
    </div>
  );
}
