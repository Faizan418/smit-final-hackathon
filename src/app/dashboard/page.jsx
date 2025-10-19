"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchVitals();
  }, []);

  const fetchReports = async () => {
    const res = await axios.get("/api/upload");
    setReports(res.data?.data || []);
  };

  const fetchVitals = async () => {
    const res = await axios.get("/api/vitals");
    setVitals(res.data?.data || []);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-400">
            🩺 Health Dashboard
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Track your reports and daily health vitals easily
          </p>
        </header>

        {/* Reports Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-green-300 flex items-center gap-2">
            📁 Uploaded Reports
          </h2>

          {reports.length === 0 ? (
            <div className="bg-gray-900 text-gray-400 p-6 rounded-xl text-center">
              No reports uploaded yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((r) => (
                <div
                  key={r._id}
                  className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-green-600/20 hover:-translate-y-1 transition transform"
                >
                  <h3 className="text-lg font-semibold text-white truncate">
                    {r.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(r.date).toLocaleDateString()}
                  </p>
                  <a
                    href={r.url}
                    target="_blank"
                    className="inline-block mt-3 bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                  >
                    View Report
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Divider Line */}
        <div className="border-t border-gray-800"></div>

        {/* Vitals Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-green-300 flex items-center gap-2">
            📊 Manual Vitals
          </h2>

          {vitals.length === 0 ? (
            <div className="bg-gray-900 text-gray-400 p-6 rounded-xl text-center">
              No vitals recorded yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitals.map((v) => (
                <div
                  key={v._id}
                  className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:shadow-green-500/20 hover:-translate-y-1 transition transform"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {new Date(v.date).toLocaleDateString()}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm">
                    <span className="text-green-400">BP:</span> {v.bp} <br />
                    <span className="text-green-400">Sugar:</span> {v.sugar} <br />
                    <span className="text-green-400">Weight:</span> {v.weight}
                  </p>
                  {v.notes && (
                    <p className="text-gray-400 mt-2 text-sm italic border-t border-gray-700 pt-2">
                      “{v.notes}”
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer/>
    </div>
  );
}
