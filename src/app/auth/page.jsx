"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const MotionButton = motion.button;
const MotionInput = motion.input;

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = async (endpoint) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast.success(data.message || (endpoint === "login" ? "Login Successful" : "Signup Successful"));
        if (endpoint === "login") router.push("/");
        else setIsLogin(true);
        setFormData({ fullName: "", email: "", password: "" });
      } else toast.error(data.message || "Authentication failed!");
    } catch {
      setLoading(false);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <>
      <style jsx>{`
        .auth-bg {
          background: radial-gradient(circle at 20% 30%, #0f172a, #1e293b, #111827);
          position: relative;
          overflow: hidden;
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          filter: blur(30px);
          animation: float 10s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .bubble:nth-child(1) { width: 150px; height: 150px; top: 10%; left: 10%; }
        .bubble:nth-child(2) { width: 200px; height: 200px; bottom: 15%; right: 15%; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center auth-bg text-white font-sans px-4">
        <Toaster position="top-center" />
        <div className="bubble"></div>
        <div className="bubble"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10"
        >
          <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide text-green-400">
            {isLogin ? "Welcome Back 👋" : "Create Account 💫"}
          </h1>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAuth("login");
                }}
              >
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Email</label>
                  <MotionInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-green-400 focus:outline-none transition-all"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Password</label>
                  <MotionInput
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-green-400 focus:outline-none transition-all"
                    placeholder="********"
                    minLength={6}
                    required
                  />
                </div>

                <MotionButton
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-semibold rounded-xl hover:opacity-90 transition"
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Processing..." : "Login"}
                </MotionButton>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAuth("signup");
                }}
              >
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
                  <MotionInput
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-green-400 focus:outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Email</label>
                  <MotionInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-green-400 focus:outline-none transition-all"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Password</label>
                  <MotionInput
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-green-400 focus:outline-none transition-all"
                    placeholder="******"
                    required
                  />
                </div>

                <MotionButton
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-semibold rounded-xl hover:opacity-90 transition"
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Creating..." : "Sign Up"}
                </MotionButton>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-gray-400 mt-6">
            {isLogin ? "Don’t have an account?" : "Already have one?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-400 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
}
