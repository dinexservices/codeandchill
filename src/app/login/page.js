"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/component/AuthContext";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/v1/admin/send-otp", { email });
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to send OTP");
      }

      setSuccess("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/v1/admin/verify-otp", { email, otp });

      if (!response.data.success) {
        throw new Error(response.data.message || "Invalid OTP");
      }

      login(response.data.admin);
      router.push("/");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/api/v1/admin/send-otp", { email });
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to send OTP");
      }

      setSuccess("OTP sent to your email!");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">
            {step === 1 ? "Enter your email to get OTP" : "Enter the OTP sent to your email"}
          </p>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
              {success}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-gray-800 border border-gray-700 text-gray-400 rounded-lg px-4 py-3 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition text-center text-2xl tracking-[12px] font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-400 hover:text-white transition"
                >
                  ← Change email
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-blue-400 hover:text-blue-300 transition disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
