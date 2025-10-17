import { connectDB } from "@/database/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, email, password } = body;

    // Check agar user pehle se exist karta hai.
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Response object me user data aur cookie shamil karo.
    const response = NextResponse.json(
      {
        message: "User registered successfully!",
        success: true,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

    // Cookie set karo.
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // 🩵 add this line
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
