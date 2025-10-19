"use client";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("⚠️ Please select a file before uploading.");

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData);
      if (res.data?.success) {
        setMessage("✅ Report uploaded successfully!");
      } else {
        setMessage("❌ Upload failed, please try again.");
      }
    } catch (err) {
      setMessage("❌ Something went wrong while uploading.");
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
          {/* Upload Icon */}
          <div className="flex justify-center mb-4">
            <UploadCloud className="w-12 h-12 text-green-500 animate-bounce" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-green-400 mb-2">
            Upload Medical Report
          </h2>
          <p className="text-gray-400 mb-6">
            Upload your <span className="text-green-300">PDF</span> or{" "}
            <span className="text-green-300">Image</span> report to analyze with
            AI.
          </p>

          {/* File Input */}
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

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-green-800 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            } text-white`}
          >
            {loading ? "⏳ Uploading..." : "🚀 Upload Now"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-sm ${
                message.includes("✅")
                  ? "text-green-400"
                  : message.includes("⚠️")
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          {/* Info Note */}
          <p className="text-xs text-gray-500 mt-6">
            🔒 Your report is stored securely using Cloudinary and MongoDB.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
