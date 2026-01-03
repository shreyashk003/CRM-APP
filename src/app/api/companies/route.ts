import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  const userId = (session.user as any).id;

  const client = await clientPromise;
  const db = client.db("crm");

  // RBAC DATA FILTERING
  const filter =
    role === "manager"
      ? {}
      : { ownerId: new ObjectId(userId) };

  const companies = await db.collection("companies").find(filter).toArray();

  return NextResponse.json(companies);
}
