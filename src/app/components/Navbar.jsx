"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // hamburger & close icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            💚 HealthMate
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-green-200">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-green-200">
              Dashboard
            </Link>
            <Link href="/upload" className="hover:text-green-200">
              Upload
            </Link>
            <Link href="/vitals" className="hover:text-green-200">
              Vitals
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800">
          <div className="flex flex-col items-center space-y-3 py-4">
            <Link
              href="/"
              className="hover:text-green-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-green-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="hover:text-green-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              href="/vitals"
              className="hover:text-green-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Vitals
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
