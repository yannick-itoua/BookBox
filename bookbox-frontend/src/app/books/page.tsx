"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-4 border-b pb-2">
            <Link href={`/books/${book.id}`}>
              <span className="text-lg font-semibold hover:underline cursor-pointer">{book.title}</span>
            </Link>
            <div className="text-gray-600">Author: {book.author}</div>
            <div className="text-gray-600">Genre: {book.genre}</div>
            <div className="text-gray-600">Available: {book.available ? "Yes" : "No"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}