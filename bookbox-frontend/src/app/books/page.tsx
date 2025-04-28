"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  isbn?: string;
  borrower?: { id: number; username: string };
};

type OpenLibraryBook = {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  number_of_pages?: number;
  description?: string | { value: string };
};

export default function BooksPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [borrowLoading, setBorrowLoading] = useState<number | null>(null);
  const { user } = useAuth();
  const [openLibraryData, setOpenLibraryData] = useState<Record<number, OpenLibraryBook | null>>({});
  const [infoLoading, setInfoLoading] = useState<number | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (genre) params.append("genre", genre);
    if (author) params.append("author", author);

    const res = await fetch(`http://localhost:8080/api/books/search?${params.toString()}`);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const handleBorrow = async (bookId: number) => {
    if (!user) {
      alert("You must be logged in to borrow a book.");
      return;
    }
    setBorrowLoading(bookId);
    const res = await fetch(
      `http://localhost:8080/api/books/${bookId}/borrow?userId=${user.id}`,
      { method: "PUT" }
    );
    if (res.ok) {
      setBooks(books =>
        books.map(book =>
          book.id === bookId ? { ...book, available: false, borrower: user } : book
        )
      );
    } else {
      alert("Failed to borrow the book.");
    }
    setBorrowLoading(null);
  };

  const fetchOpenLibraryInfo = async (bookId: number, isbn?: string) => {
    if (!isbn) return;
    setInfoLoading(bookId);
    try {
      const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      if (res.ok) {
        const data = await res.json();
        setOpenLibraryData(prev => ({ ...prev, [bookId]: data }));
      } else {
        setOpenLibraryData(prev => ({ ...prev, [bookId]: null }));
      }
    } catch {
      setOpenLibraryData(prev => ({ ...prev, [bookId]: null }));
    }
    setInfoLoading(null);
  };

  const getDescription = (desc: string | { value: string } | undefined) => {
    if (!desc) return "N/A";
    if (typeof desc === "string") return desc;
    if (typeof desc === "object" && desc !== null && "value" in desc) return desc.value;
    return "N/A";
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4 bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 mb-6 bg-white/90 p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border px-3 py-2 rounded text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="border px-3 py-2 rounded text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="border px-3 py-2 rounded text-[#5b3921] bg-white focus:outline-none focus:ring-2 focus:ring-[#a67c52] text-base"
        />
        <button
          type="submit"
          className="bg-[#a67c52] text-white px-4 py-2 rounded hover:bg-[#7c5e3c] text-base"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div className="text-[#5b3921]">Loading...</div>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-4 flex flex-col gap-2 bg-white/90 p-4 rounded shadow">
              <div className="flex items-center gap-4">
                {book.isbn && (
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                    alt={book.title}
                    width={48}
                    height={64}
                    className="w-12 h-16 object-cover"
                  />
                )}
                <Link href={`/books/${book.id}`}>
                  <span className="text-lg font-semibold hover:underline cursor-pointer text-[#5b3921]">
                    {book.title}
                  </span>
                </Link>
                <span className="text-[#7c5e3c]">
                  {" "}by {book.author} ({book.genre})
                </span>
                {book.available ? (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleBorrow(book.id)}
                    disabled={borrowLoading === book.id}
                  >
                    {borrowLoading === book.id ? "Borrowing..." : "Borrow"}
                  </button>
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
                {book.isbn && (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
                    onClick={() => fetchOpenLibraryInfo(book.id, book.isbn)}
                    disabled={infoLoading === book.id}
                  >
                    {infoLoading === book.id ? "Loading..." : "More Info"}
                  </button>
                )}
              </div>
              {/* Show Open Library metadata if loaded */}
              {openLibraryData[book.id] && (
                <div className="bg-gray-100 p-2 rounded text-sm mt-1 text-[#5b3921]">
                  <div>
                    <strong>Description:</strong>{" "}
                    {getDescription(openLibraryData[book.id]?.description)}
                  </div>
                  <div>
                    <strong>Published:</strong> {openLibraryData[book.id]?.publish_date || "N/A"}
                  </div>
                  <div>
                    <strong>Pages:</strong> {openLibraryData[book.id]?.number_of_pages || "N/A"}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}