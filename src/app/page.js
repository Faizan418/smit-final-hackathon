import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-16 sm:py-20 px-4 sm:px-8 md:px-12 flex-grow">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 mb-4 leading-tight">
          💚 HealthMate – Sehat ka Smart Dost
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          Your personal health assistant that helps you upload, analyze, and
          understand your medical reports using AI.  
          <br />
          <span className="font-semibold">Smart, Secure, and Simple.</span>
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link
            href="/upload"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Upload Report
          </Link>
          <Link
            href="/dashboard"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          🌟 Key Features
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "AI Report Analysis",
              desc: "Upload medical reports and get instant bilingual (English + Roman Urdu) summaries using Gemini AI.",
            },
            {
              title: "Track Health Vitals",
              desc: "Add your BP, Sugar, and Weight manually to track progress over time.",
            },
            {
              title: "Secure Cloud Storage",
              desc: "All your reports are safely stored using Cloudinary & MongoDB with JWT-based access.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-green-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 sm:py-16 px-4 bg-green-600 text-white mt-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Start Managing Your Health Smarter
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Upload your reports, get instant insights, and track your wellness
            journey today.
          </p>
          <Link
            href="/upload"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
