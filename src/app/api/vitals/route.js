import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Vitals from "@/models/vitalsModel";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const data = await Vitals.create(body);
  return NextResponse.json({ success: true, data });
}

export async function GET() {
  await connectDB();
  const data = await Vitals.find();
  return NextResponse.json({ success: true, data });
}
