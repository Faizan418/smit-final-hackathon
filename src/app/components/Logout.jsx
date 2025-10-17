"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import React from "react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push("/auth");
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Toaster />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
