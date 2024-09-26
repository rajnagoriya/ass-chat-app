"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsDisabled(!user.email || !user.password);
    }, [user]);

    const handleLogin = async () => {
        setLoading(true);
        try {
          const response = await axios.post("/api/users/login", user);
          if(response){
            Cookies.set('ChatAppAuthToken', response.data?.token, { expires: 7 });
            toast.success(response?.data?.message || "Login successfully");
          }
            router.push("/dashboard");
        } catch (error) {
            // Check if error response exists and extract the message
            const errorMessage = error.response?.data?.error || "Login failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-sm w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                    {loading ? "Login...." : "Login"}
                </h2>
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
                </div>
                <button
                    onClick={handleLogin}
                    disabled={isDisabled || loading}
                    className={`btn w-full mt-4 ${loading ? "loading" : "bg-blue-600 text-white"}`}
                >
                    {loading ? "Please wait..." : "login"}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    register?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
