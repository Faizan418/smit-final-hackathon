// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";

// const formVariants = {
//   initial: {
//     opacity: 0,
//     y: 20,
//     scale: 0.95,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.5,
//       ease: "easeInOut",
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     scale: 0.95,
//     transition: {
//       duration: 0.5,
//       ease: "easeInOut",
//     },
//   },
// };

// const MotionButton = motion.button;
// const MotionInput = motion.input;

// export default function AuthPage() {
//   const router = useRouter();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           text: data.message,
//         });
//         router.push("/");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: data.message,
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Login error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong.",
//       });
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Signup Successful!",
//           text: data.message,
//         });
//         setIsLogin(true);
//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Signup Failed",
//           text: data.message,
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Signup error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//           @keyframes gradient-flow {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//           .gradient-bg {
//             background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
//             background-size: 400% 400%;
//             animation: gradient-flow 15s ease infinite;
//           }
//           .glass-container {
//             background: rgba(255, 255, 255, 0.1);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//             backdrop-filter: blur(10px);
//           }
//           .border-glow {
//             animation: border-animate 15s ease infinite;
//           }
//           @keyframes border-animate {
//             0% { box-shadow: 0 0 10px #ee7752, 0 0 20px #e73c7e; }
//             50% { box-shadow: 0 0 10px #23a6d5, 0 0 20px #23d5ab; }
//             100% { box-shadow: 0 0 10px #ee7752, 0 0 20px #e73c7e; }
//           }
//         `}
//       </style>
//       <div className="min-h-screen flex items-center justify-center gradient-bg text-white font-sans p-4">
//         <Toaster />
//         <div className="relative z-10 w-full max-w-md p-10 rounded-3xl glass-container shadow-2xl border-glow transition-all duration-700 ease-in-out">
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg">
//               {isLogin ? "Login" : "Signup"}
//             </h1>
//           </motion.div>

//           <AnimatePresence mode="wait">
//             {isLogin ? (
//               <motion.form
//                 key="login-form"
//                 onSubmit={handleLogin}
//                 className="space-y-6"
//                 variants={formVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div>
//                   <label className="block text-gray-200 font-medium mb-2">
//                     Email
//                   </label>
//                   <MotionInput
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-5 py-3 rounded-full bg-black bg-opacity-20 text-white placeholder-gray-400 transition-all duration-300 transform focus:scale-105 border-2 border-transparent focus:border-white focus:outline-none"
//                     placeholder=" 'example123@gmail.com' "
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-200 font-medium mb-2">
//                     Password
//                   </label>
//                   <MotionInput
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-5 py-3 rounded-full bg-black bg-opacity-20 text-white placeholder-gray-400 transition-all duration-300 transform focus:scale-105 border-2 border-transparent focus:border-white focus:outline-none"
//                     placeholder=" '*****' "
//                     minLength={6}
//                     maxLength={20}
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//                 <MotionButton
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-400"
//                   disabled={loading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {loading ? "Processing..." : "Login"}
//                 </MotionButton>
//               </motion.form>
//             ) : (
//               <motion.form
//                 key="signup-form"
//                 onSubmit={handleSignup}
//                 className="space-y-6"
//                 variants={formVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div>
//                   <label className="block text-gray-200 font-medium mb-2">
//                     Full Name
//                   </label>
//                   <MotionInput
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="w-full px-5 py-3 rounded-full bg-black bg-opacity-20 text-white placeholder-gray-400 transition-all duration-300 transform focus:scale-105 border-2 border-transparent focus:border-white focus:outline-none"
//                     placeholder="name 'xyx' "
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-200 font-medium mb-2">
//                     Email
//                   </label>
//                   <MotionInput
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-5 py-3 rounded-full bg-black bg-opacity-20 text-white placeholder-gray-400 transition-all duration-300 transform focus:scale-105 border-2 border-transparent focus:border-white focus:outline-none"
//                     placeholder=" 'example123@gmai.com' "
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-200 font-medium mb-2">
//                     Password
//                   </label>
//                   <MotionInput
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-5 py-3 rounded-full bg-black bg-opacity-20 text-white placeholder-gray-400 transition-all duration-300 transform focus:scale-105 border-2 border-transparent focus:border-white focus:outline-none"
//                     placeholder=" '******' "
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//                 <MotionButton
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-400"
//                   disabled={loading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {loading ? "Processing..." : "Signup"}
//                 </MotionButton>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           <p className="mt-6 text-center text-gray-300">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <span
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setFormData({
//                   fullName: "",
//                   email: "",
//                   password: "",
//                 });
//               }}
//               className="text-white cursor-pointer font-bold hover:underline"
//             >
//               {isLogin ? "Signup here" : "Login here"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }  


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
