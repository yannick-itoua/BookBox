"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        setError("Registration failed.");
        return;
      }

      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push("/users/login");
      }, 1000);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <div className="w-full max-w-sm bg-white/90 rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-[#5b3921]">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-[#5b3921]">Username</label>
            <input
              className="w-full border rounded px-3 py-2 text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-[#5b3921]">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-[#5b3921]">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">Registration successful! Redirecting to login...</div>}
          <button
            type="submit"
            className="bg-[#a67c52] text-white px-4 py-2 rounded hover:bg-[#7c5e3c] text-base"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}