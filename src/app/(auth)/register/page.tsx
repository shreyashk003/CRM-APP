"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // Successful registration -> Navigate to Login
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
          
          <select 
            name="role" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
            required
          >
            <option value="rep">Sales Representative (Rep)</option>
            <option value="manager">Manager</option>
          </select>

          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}