"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ViewReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [ai, setAi] = useState(null);
  const [lang, setLang] = useState("english");

  useEffect(() => {
    if (id) fetchReport();
  }, [id]);

  const fetchReport = async () => {
    const res = await axios.get(`/api/upload?id=${id}`);
    setReport(res.data?.data);

    const aiRes = await axios.post("/api/analyze", {
      fileUrl: res.data?.data?.url,
    });
    setAi(aiRes.data?.data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">🧠 AI Report Summary</h1>

      {report && (
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold text-lg">{report.name}</h2>
          <a
            href={report.url}
            className="text-blue-600 underline"
            target="_blank"
          >
            Open Original Report
          </a>
        </div>
      )}

      {ai && (
        <div className="bg-gray-50 border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">AI Explanation</h3>
            <button
              onClick={() => setLang(lang === "english" ? "urdu" : "english")}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              {lang === "english" ? "Roman Urdu" : "English"}
            </button>
          </div>
          <p className="whitespace-pre-wrap">
            {lang === "english" ? ai.englishSummary : ai.urduSummary}
          </p>
        </div>
      )}
    </div>
  );
}
