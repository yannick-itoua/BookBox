"use client";
import Link from "next/link";
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  isbn?: string;
  borrowerId?: number | null;
  borrower?: { id: number; username: string };
};

type BookListProps = {
  books: Book[];
  currentUser?: { id: number; username: string };
};

export default function BookList({ books, currentUser }: BookListProps) {
  const [returnLoading, setReturnLoading] = useState<number | null>(null);

  const handleReturn = async (bookId: number) => {
    setReturnLoading(bookId);
    const res = await fetch(
      `http://localhost:8080/api/books/${bookId}/return`,
      { method: "PUT" }
    );
    if (res.ok) {
      // Optionally refresh the book list from the server here
    } else {
      alert("Failed to return the book.");
    }
    setReturnLoading(null);
  };

  if (!books.length) {
    return <div className="p-4">No books found.</div>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id} className="mb-4 border-b pb-2 flex items-center gap-4">
          {book.isbn && (
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              alt={book.title}
              className="w-12 h-16 object-cover"
            />
          )}
          <div>
            {/* Show ISBN link for Open Library books, ID link for local books */}
            <Link href={`/books/${book.isbn && book.isbn.trim() !== "" ? book.isbn : book.id}`}>
              <span className="text-lg font-semibold hover:underline cursor-pointer">{book.title}</span>
            </Link>
            <div className="text-gray-600">Author: {book.author}</div>
            <div className="text-gray-600">Genre: {book.genre}</div>
            <div className="text-gray-600">Available: {book.available ? "Yes" : "No"}</div>
            {/* Only show Return button for the user who borrowed the book */}
            {!book.available && currentUser && (book.borrower?.id === currentUser.id || book.borrowerId === currentUser.id) && (
              <button
                className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => handleReturn(book.id)}
                disabled={returnLoading === book.id}
              >
                {returnLoading === book.id ? "Returning..." : "Return"}
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}