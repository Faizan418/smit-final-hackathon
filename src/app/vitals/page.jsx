"use client";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Activity } from "lucide-react";

export default function VitalsPage() {
  const [form, setForm] = useState({
    bp: "",
    sugar: "",
    weight: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/vitals", form);
      setMessage("✅ Vitals Saved Successfully!");
      setForm({ bp: "", sugar: "", weight: "", notes: "" });
    } catch (error) {
      setMessage("❌ Error saving vitals, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow flex justify-center items-center px-4 py-16">
        <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center transform transition hover:scale-[1.01]">

          <div className="flex justify-center mb-4">
            <Activity className="w-12 h-12 text-green-500 animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold text-green-400 mb-2">
            Add Your Health Vitals
          </h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Record your daily <span className="text-green-300">BP</span>,{" "}
            <span className="text-green-300">Sugar</span>, and{" "}
            <span className="text-green-300">Weight</span> to monitor your
            health.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {["bp", "sugar", "weight"].map((f) => (
              <div key={f}>
                <label
                  htmlFor={f}
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {f.toUpperCase()}
                </label>
                <input
                  id={f}
                  name={f}
                  placeholder={`Enter ${f}`}
                  value={form[f]}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Optional notes (e.g. after exercise, before meal)"
                value={form.notes}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-green-800 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {loading ? "⏳ Saving..." : "💾 Save Vitals"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm text-center ${
                message.includes("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-6 text-center">
            📊 You can view all your saved vitals in the{" "}
            <span className="text-green-400">Dashboard</span>.
          </p>
        </div>
      </main>
    </div>
  );
}
