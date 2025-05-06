"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  isbn?: string;
  ownerId?: number;
  borrowerId?: number | null;
  borrower?: { id: number; username: string };
};

type BookListProps = {
  books: Book[];
  currentUser?: { id: number; username: string };
  onDelete?: (bookId: number) => void;
  showDelete?: boolean;
  refreshBooks?: () => void; // <-- Add this line
};

export default function BookList({ books, currentUser, onDelete, showDelete, refreshBooks }: BookListProps) {
  const [returnLoading, setReturnLoading] = useState<number | null>(null);
  const [borrowLoading, setBorrowLoading] = useState<number | null>(null);

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

  const onBorrow = async (bookId: number) => {
    setBorrowLoading(bookId);
    const res = await fetch(
      `http://localhost:8080/api/books/${bookId}/borrow`,
      { method: "PUT" }
    );
    setBorrowLoading(null);
    if (res.ok && refreshBooks) refreshBooks();
  };

  if (!books.length) {
    return <div className="p-4">No books found.</div>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id} className="mb-4 border-b pb-2 flex items-center gap-4">
          {book.isbn && (
            <Image
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              alt={book.title || "Book cover"}
              width={48}
              height={64}
              className="w-12 h-16 object-cover"
            />
          )}
          <div>
            {/* Show ISBN link for Open Library books, ID link for local books */}
            <Link href={`/books/${book.id}`}>
              <span className="text-lg font-semibold hover:underline cursor-pointer">{book.title}</span>
            </Link>
            <div className="text-gray-600">Author: {book.author}</div>
            <div className="text-gray-600">Genre: {book.genre}</div>
            <div className="text-gray-600">Available: {book.available ? "Yes" : "No"}</div>
            {/* Show Borrow or Return button */}
            {book.available ? (
              // Borrow button
              <button
                className="ml-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                onClick={() => onBorrow(book.id)}
                disabled={borrowLoading === book.id}
              >
                {borrowLoading === book.id ? "Borrowing..." : "Borrow"}
              </button>
            ) : (
              book.borrowerId === currentUser?.id && (
                // Return button
                <button
                  className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleReturn(book.id)}
                  disabled={returnLoading === book.id}
                >
                  {returnLoading === book.id ? "Returning..." : "Return"}
                </button>
              )
            )}
            {/* Show Delete button for books owned by the current user if enabled */}
            {showDelete && onDelete && book.ownerId === currentUser?.id && (
              <button
                className="ml-2 bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}