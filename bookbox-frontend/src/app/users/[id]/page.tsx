"use client";
import { useParams } from "next/navigation";
import UserProfile from "../../components/UserProfile";

export default function UserDetailPage() {
  const { id } = useParams();
  const userId = typeof id === "string" ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : undefined;

  if (!userId) return <div className="p-4">Invalid user ID.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <UserProfile userId={userId} />
    </div>
  );
}