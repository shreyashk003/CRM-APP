"use server";

import { connectDB } from "@/lib/actions/db";
import User from "@/models/User";

export async function registerUser(formData: FormData) {
  await connectDB();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "User already exists" };

    await User.create({ email, password, role });
    return { success: true };
  } catch (error) {
    return { error: "Failed to create account" };
  }
}