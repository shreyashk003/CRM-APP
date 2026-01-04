"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/actions/db"; // Ensure this path is correct (@/lib/db or @/lib/actions/db)
import { Company, Contact, Deal } from "@/models/CRM";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

/** 1. COMPANY ACTIONS **/
export async function getCompanies() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();

  const filter = session.user.role === "manager" ? {} : { createdBy: session.user.id };
  
  const data = await Company.find(filter).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getCompanyWithDetails(id: string) {
  const session = await auth();
  if (!session || !mongoose.Types.ObjectId.isValid(id)) return null;
  await connectDB();

  const company = await Company.findById(id).lean();
  if (!company) return null;

  const contacts = await Contact.find({ companyId: id }).lean();
  const deals = await Deal.find({ companyId: id }).lean();

  return JSON.parse(JSON.stringify({ company, contacts, deals }));
}

/** 2. CONTACT ACTIONS **/
export async function getContacts() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();
  
  const contacts = await Contact.find({}).populate("companyId").lean();
  return JSON.parse(JSON.stringify(contacts));
}

/** 3. PIPELINE ACTIONS **/
export async function getPipelineData() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();

  const filter = session.user.role === "manager" ? {} : { owner: session.user.id };
  const deals = await Deal.find(filter).populate("companyId").lean();

  const openDeals = deals.filter((d: any) => !["Won", "Lost"].includes(d.stage));
  const wonDeals = deals.filter((d: any) => d.stage === "Won");
  const lostDeals = deals.filter((d: any) => d.stage === "Lost");
  
  const totalOpenValue = openDeals.reduce((acc: number, d: any) => acc + (d.value || 0), 0);

  return JSON.parse(JSON.stringify({
    deals,
    metrics: {
      totalOpenValue,
      openCount: openDeals.length,
      wonCount: wonDeals.length,
      lostCount: lostDeals.length,
    }
  }));
}

/** 4. DEAL MUTATIONS (The Fix for the Broken Pipeline) **/

// NEW: This allows the UI to move deals between columns
export async function updateDealStage(dealId: string, newStage: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();

  // Basic Security: Reps can only move their own deals
  const deal = await Deal.findById(dealId);
  if (!deal) throw new Error("Deal not found");
  
  if (session.user.role !== "manager" && deal.owner.toString() !== session.user.id) {
    throw new Error("You do not have permission to move this deal");
  }

  await Deal.findByIdAndUpdate(dealId, { stage: newStage });
  
  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard/deals");
}

export async function createDeal(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();

  await Deal.create({
    title: formData.get("title"),
    value: Number(formData.get("value")),
    companyId: formData.get("companyId"),
    owner: session.user.id,
    stage: "New",
  });
  
  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard/deals");
}

// NEW: Useful for cleaning up the demo data
export async function deleteDeal(dealId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await connectDB();

  await Deal.findByIdAndDelete(dealId);
  revalidatePath("/dashboard/pipeline");
}