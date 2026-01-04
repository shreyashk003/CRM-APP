"use server";
import { connectDB } from "./db";
import { Deal } from "@/models/CRM";

export async function getPipelineMetrics() {
  await connectDB();

  // Rule: Only Won and Lost count as closed [cite: 82]
  const openDeals = await Deal.aggregate([
    { $match: { stage: { $nin: ["Won", "Lost"] } } },
    { $group: { _id: null, totalValue: { $sum: "$value" }, count: { $sum: 1 } } }
  ]);

  // Manager View: Top performers [cite: 148]
  const topReps = await Deal.aggregate([
    { $match: { stage: "Won" } },
    { $group: { _id: "$owner", wonValue: { $sum: "$value" } } },
    { $sort: { wonValue: -1 } },
    { $limit: 5 }
  ]);

  return { metrics: openDeals[0], topReps };
}