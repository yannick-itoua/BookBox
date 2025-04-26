"use client";
import Link from "next/link";

type User = {
  id: number;
  username: string;
  email: string;
};

type UserListProps = {
  users: User[];
};

export default function UserList({ users }: UserListProps) {
  if (!users.length) {
    return <div className="p-4">No users found.</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="mb-4 border-b pb-2">
          <Link href={`/users/${user.id}`}>
            <span className="text-lg font-semibold hover:underline cursor-pointer">{user.username}</span>
          </Link>
          <div className="text-gray-600">Email: {user.email}</div>
        </li>
      ))}
    </ul>
  );
}