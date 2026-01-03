"use server";

import { connectDB } from "@/lib/actions/db";
import { Company, Contact, Deal } from "@/models/CRM";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// FETCH DEALS WITH RBAC
export async function getDeals() {
  await connectDB();
  const session = await auth();
  if (!session?.user) return [];

  const user = session.user as any;
  // If user is a Rep, only show their own deals
  const query = user.role === "manager" ? {} : { owner: user.id };

  const deals = await Deal.find(query)
    .populate("company")
    .populate("contact")
    .sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(deals));
}

// CREATE A NEW DEAL
export async function createDeal(data: any) {
  await connectDB();
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const newDeal = await Deal.create({
    ...data,
    owner: session.user.id, // Automatic assignment to the creator
  });

  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(newDeal));
}