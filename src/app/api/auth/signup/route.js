import { connectDB } from "@/database/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json(
      {
        message: "Signup successful!",
        success: true,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
