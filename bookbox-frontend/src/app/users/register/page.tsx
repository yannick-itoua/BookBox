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
      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/users/login");
      }, 1000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-2 py-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-2 py-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">Registration successful! Redirecting to login...</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}