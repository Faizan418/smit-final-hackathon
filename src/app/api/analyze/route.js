import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import AiInsight from "@/models/AiInsight";

export async function POST(req) {
  await connectDB();
  const { fileUrl } = await req.json();

  const prompt = `
  You are a medical assistant. Read the report from this URL: ${fileUrl}
  Summarize it in:
  1. Simple English
  2. Roman Urdu
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const [englishSummary, urduSummary] = text.split("Roman Urdu:");

  const insight = await AiInsight.create({
    englishSummary,
    urduSummary,
  });

  return NextResponse.json({ success: true, data: insight });
}
