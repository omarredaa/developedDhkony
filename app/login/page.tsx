"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-indigo-600/30 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-600/30 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* Glass Card */}
      <div
        className="relative z-10 w-full max-w-md p-8 rounded-3xl
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        shadow-2xl
      "
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none px-3 w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none px-3 w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold shadow-lg shadow-indigo-600/30"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
