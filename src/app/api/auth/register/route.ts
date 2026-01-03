import { NextResponse } from "next/server";
import { connectDB } from "@/lib/actions/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }

  await User.create({
    email,
    password, // hashed by schema middleware
    role: role || "rep",
  });

  return NextResponse.json({ message: "User registered" });
}
