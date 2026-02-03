import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "shreyas" && password === "adiga123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard"); // ✅ FIXED
    } else {
      setError("Invalid admin credentials");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-slate-950">

        {/* Animated background */}
        <div className="absolute inset-0 -z-0">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-px bg-indigo-400/20"
              style={{ left: `${i * 6}%`, height: "100%" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 18 + i,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Login Card */}
        <motion.div
          animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">
            Admin Login
          </h1>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full border px-4 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border px-4 py-2 pr-12 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-indigo-600 transition"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg
              font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Admin access only
          </p>
        </motion.div>
      </div>
    </>
  );
}
