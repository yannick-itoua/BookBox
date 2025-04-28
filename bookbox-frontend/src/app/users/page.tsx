"use client";
import { useEffect, useState } from "react";
import UserList from "../components/UserList";

type User = {
  id: number;
  username: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-[#5b3921]">Loading...</div>;

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4 bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <h1 className="text-2xl font-bold mb-4 text-[#5b3921]">Users</h1>
      <div className="bg-white/90 rounded shadow p-4">
        <UserList users={users} />
      </div>
    </div>
  );
}