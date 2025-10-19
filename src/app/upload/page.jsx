"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(""); // AI summary

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file before uploading.");
      return;
    }

    setLoading(true);
    setMessage("");
    setAnalysis("");

    try {
      // 1. Upload file to backend (Cloudinary + MongoDB)
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await axios.post("/api/upload", formData);
      const fileUrl = uploadRes.data?.data?.url;

      if (!fileUrl) {
        throw new Error("Upload succeeded but no file URL returned.");
      }

      // 2. Call Gemini API for summary/analysis
      const prompt = `Here is a medical report uploaded at URL: ${fileUrl}. Please read it and provide a simple English summary and Roman Urdu explanation.`;
      const aiRes = await axios.post("/api/analyze", { prompt });

      if (aiRes.data?.success && aiRes.data?.data) {
        setAnalysis(aiRes.data.data);
        setMessage("✅ Report uploaded and analyzed!");
      } else {
        throw new Error("AI analysis failed.");
      }
    } catch (err) {
      console.error("Upload/Analysis error:", err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow flex justify-center items-center px-4 py-16">
        <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center transform transition hover:scale-[1.01]">
          <div className="flex justify-center mb-4">
            <UploadCloud className="w-12 h-12 text-green-500 animate-bounce" />
          </div>

          <h2 className="text-3xl font-bold text-green-400 mb-2">
            Upload Medical Report
          </h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Upload your <span className="text-green-300">PDF</span> or{" "}
            <span className="text-green-300">Image</span> report for AI-driven
            analysis.
          </p>

          <label
            htmlFor="file"
            className="block cursor-pointer bg-gray-800 border border-gray-700 hover:border-green-500 p-4 rounded-lg text-gray-300 hover:text-green-300 transition mb-4"
          >
            {file ? (
              <span className="font-medium text-green-400">{file.name}</span>
            ) : (
              <span>Select a report file</span>
            )}
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-green-800 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "⏳ Uploading..." : "🚀 Upload Now"}
          </button>

          {message && (
            <p
              className={`mt-4 text-sm text-center ${
                message.startsWith("✅")
                  ? "text-green-400"
                  : message.startsWith("⚠️")
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          {analysis && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg text-left text-sm sm:text-base">
              <h3 className="font-semibold text-green-300 mb-2">AI Summary:</h3>
              <pre className="whitespace-pre-wrap text-gray-200">
                {analysis}
              </pre>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-6 text-center">
            🔒 Your report is stored securely and only you can view it.
          </p>
        </div>
      </main>
    </div>
  );
}
