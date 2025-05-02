"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import Link from "next/link";

// Book type definition
type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  isbn?: string;
  ownerId?: number;
};

export default function UserBooksPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books owned by the current user
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/users/${user.id}/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, [user]);

  // Refresh list after adding a book
  const handleBookAdded = () => {
    if (!user) return;
    fetch(`http://localhost:8080/api/users/${user.id}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  // Refresh list after deleting a book
  const handleDelete = async (bookId: number) => {
    await fetch(`http://localhost:8080/api/books/${bookId}`, { method: "DELETE" });
    setBooks(books.filter((b) => b.id !== bookId));
  };

  if (!user) {
    return <div className="p-4 text-center text-lg">Please log in to manage your books.</div>;
  }
  if (loading) {
    return <div className="p-4 text-center text-lg">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          href="/books"
          className="bg-[#a67c52] text-white px-4 py-2 rounded hover:bg-[#7c5e3c] text-base"
        >
          All Books
        </Link>
      </div>
      <div className="min-h-screen max-w-2xl mx-auto p-4 bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
        <h1 className="text-3xl font-bold mb-6 text-[#5b3921] text-center">My Books</h1>
        <div className="mb-8 bg-white/90 p-4 rounded shadow">
          <BookForm onBookAdded={handleBookAdded} />
        </div>
        <BookList
          books={books}
          currentUser={user}
          onDelete={handleDelete}
          showDelete={true}
        />
      </div>
    </div>
  );
}