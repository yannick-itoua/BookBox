import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to BookBox 📚</h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-xl">
        Manage your books, users, and lending with ease. Use the navigation below to get started.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/books"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          View Books
        </Link>
        <Link
          href="/users"
          className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition"
        >
          View Users
        </Link>
        <Link
          href="/users/login"
          className="bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-900 transition"
        >
          Login
        </Link>
        <Link
          href="/users/register"
          className="bg-gray-500 text-white px-6 py-3 rounded shadow hover:bg-gray-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
