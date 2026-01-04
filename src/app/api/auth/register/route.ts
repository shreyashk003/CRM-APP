import { NextResponse } from "next/server";
import { connectDB } from "@/lib/actions/db"; 
import User from "@/models/User";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all required fields." }, 
        { status: 400 }
      );
    }

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "A user with this email already exists." }, 
        { status: 400 }
      );
    }

    // --- THE FIX: HASH MANUALLY BEFORE SAVING ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Save the hashed version
      role: role || "rep",
    });

    return NextResponse.json(
      { message: "User registered successfully!", userId: newUser._id }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." }, 
      { status: 500 }
    );
  }
}