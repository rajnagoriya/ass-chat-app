"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpSend, setIsOtpSend] = useState(false);
  const [otp, setOtp] = useState(""); // OTP state
  const [timer, setTimer] = useState(60); // Timer for resend OTP
  const [canResendOtp, setCanResendOtp] = useState(false); // OTP resend state

  useEffect(() => {
    setIsDisabled(!user.email || !user.password);
  }, [user]);

  // Start countdown timer when OTP is sent
  useEffect(() => {
    let countdown;
    if (otpSend && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResendOtp(true); // Enable resend OTP when timer reaches 0
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [otpSend, timer]);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      if (response) {
        setIsOtpSend(true);
        toast.success(response?.data?.message || "OTP sent to your email");
        setTimer(60); // Reset timer to 60 seconds when OTP is sent
        setCanResendOtp(false); // Disable resend button
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    console.log("handle verification called")
    try {
      const response = await axios.post("/api/users/auth/verifyEmailOtp", {
        email: user.email,
        otp,
      });
      if (response?.data?.token) {
        // OTP verification successful, set token in cookies
        Cookies.set("ChatAppAuthToken", response.data.token);
        toast.success("Signup successful");
        router.push("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "OTP verification failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/auth/resendOtp", { email: user.email });
      if (response) {
        toast.success("OTP resent to your email");
        setTimer(60); // Reset timer when OTP is resent
        setCanResendOtp(false); // Disable resend button
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to resend OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {loading ? "Processing..." : otpSend ? "Verify OTP" : "Create an Account"}
        </h2>
        {!otpSend ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input input-bordered w-full"
            />
            <button
              onClick={handleSignup}
              disabled={isDisabled || loading}
              className={`btn w-full mt-4 ${loading ? "loading" : "bg-blue-600 text-white"}`}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered w-full"
            />
            <button
              onClick={handleOtpVerification}
              disabled={!otp || loading}
              className={`btn w-full mt-4 ${loading ? "loading" : "bg-blue-600 text-white"}`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-center text-sm text-gray-500 mt-4">
              {canResendOtp ? (
                <button onClick={handleResendOtp} disabled={loading} className="text-blue-600 hover:underline">
                  Resend OTP
                </button>
              ) : (
                <span>Resend OTP in {timer} seconds</span>
              )}
            </div>
          </div>
        )}
        {!otpSend && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
