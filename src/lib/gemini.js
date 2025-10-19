// pseudo code — adapt to the official Gemini Node client you will use
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function analyzeFile(fileUrl) {
  const prompt = `
    You are a helpful medical assistant. Analyze this report at ${fileUrl}.
    Provide:
    1) Short English summary (3-4 lines).
    2) Roman Urdu explanation (3-4 lines).
    3) List abnormal values if any (name: value).
    4) 3 questions to ask the doctor.
  `;

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  const res = await model.generateContent({ prompt });
  return res.response?.text || "";
}
