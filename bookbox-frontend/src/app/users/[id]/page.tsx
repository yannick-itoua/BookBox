"use client";
import { useParams } from "next/navigation";
import UserProfile from "../../components/UserProfile";

export default function UserDetailPage() {
  const { id } = useParams();
  const userId = typeof id === "string" ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : undefined;

  if (!userId) return <div className="p-4 text-[#5b3921]">Invalid user ID.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <div className="w-full max-w-xl bg-white/90 rounded shadow p-6">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
}