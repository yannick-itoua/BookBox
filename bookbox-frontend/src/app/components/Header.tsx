"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="w-full py-4 px-8 bg-white shadow mb-8 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-700 hover:underline">
        BookBox
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Hello, {user.username}</span>
            <Link
              href={`/users/${user.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
            >
              Logout
            </button>
          </div>
        ) : (
          // Only show Login/Register if NOT on the home page
          pathname !== "/" && (
            <div className="flex gap-4">
              <Link
                href="/users/login"
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
              >
                Login
              </Link>
              <Link
                href="/users/register"
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Register
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  );
}