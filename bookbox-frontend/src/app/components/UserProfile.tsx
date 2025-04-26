"use client";
import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  // Add more fields as needed
};

type UserProfileProps = {
  userId: number;
};

export default function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
      <p className="text-gray-700 mb-1">Email: {user.email}</p>
      {/* Add more user info or book lending history here */}
    </div>
  );
}