"use client";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
};

type BookListProps = {
  books: Book[];
};

export default function BookList({ books }: BookListProps) {
  if (!books.length) {
    return <div className="p-4">No books found.</div>;
  }

  return (
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
  );
}