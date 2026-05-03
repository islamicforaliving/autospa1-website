"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

const CORRECT_PASSWORD = "gusauto";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("siteAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("siteAuth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25"
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Password Protected
            </h1>
            <p className="text-white/60 mb-8 text-sm md:text-base">
              Please enter the password to access this site
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all pr-12"
                  autoComplete="off"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                Enter Site
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}