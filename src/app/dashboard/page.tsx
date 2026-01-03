export const runtime = "nodejs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardIndex() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  if (session.user.role === "manager") {
    redirect("/dashboard/manager");
  }

  redirect("/dashboard/rep");
}
