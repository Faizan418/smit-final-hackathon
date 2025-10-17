import { connectDB } from "../../../../database/db";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json(
      {
        message: "Login successful!",
        success: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true, // 🩵 always true for Vercel (HTTPS)
      sameSite: "none", // 🩵 critical for cross-origin cookie
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
