"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.4 } },
};

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Login successful 🎉",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/");
      } else {
        Swal.fire({ icon: "error", title: "Login Failed", text: data.message });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong.",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Signup successful 🎊",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsLogin(true);
        setFormData({ fullName: "", email: "", password: "" });
      } else {
        Swal.fire({ icon: "error", title: "Signup Failed", text: data.message });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong.",
      });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .auth-bg {
            background: linear-gradient(-45deg, #2b5876, #4e4376, #43cea2, #185a9d);
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
          }

          .glass {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <div className="min-h-screen auth-bg flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full p-8 rounded-3xl glass shadow-2xl">
          <motion.h1
            className="text-4xl font-extrabold text-center mb-8 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isLogin ? "Welcome Back 👋" : "Create Your Account ✨"}
          </motion.h1>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onSubmit={handleLogin}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-full bg-white bg-opacity-15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-full bg-white bg-opacity-15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 font-semibold bg-gradient-to-r from-teal-400 to-blue-500 rounded-full hover:from-teal-500 hover:to-blue-600 shadow-lg transition-all duration-300"
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-full bg-white bg-opacity-15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-full bg-white bg-opacity-15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-full bg-white bg-opacity-15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 font-semibold bg-gradient-to-r from-pink-400 to-purple-500 rounded-full hover:from-pink-500 hover:to-purple-600 shadow-lg transition-all duration-300"
                >
                  {loading ? "Creating..." : "Signup"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-6 text-center text-gray-300 text-sm">
            {isLogin ? "Don't have an account?" : "Already have one?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-white cursor-pointer hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
