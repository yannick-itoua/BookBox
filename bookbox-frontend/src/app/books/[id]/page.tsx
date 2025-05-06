"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type OpenLibraryBook = {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  number_of_pages?: number;
  description?: string | { value: string };
  covers?: number[];
};

type LocalBook = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  available: boolean;
  coverUrl?: string;
  isbn?: string;
};

export default function BookDetailPage() {
  const params = useParams();
  const idOrIsbn = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const [book, setBook] = useState<OpenLibraryBook | LocalBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (!idOrIsbn) return;
    setLoading(true);

    // If all digits, treat as local DB id, else as ISBN
    if (/^\d+$/.test(idOrIsbn)) {
      // Local book by ID
      fetch(`http://localhost:8080/api/books/${idOrIsbn}`)
        .then((res) => {
          if (!res.ok) throw new Error("Book not found");
          return res.json();
        })
        .then((data) => {
          setBook(data);
          setIsLocal(true);
          setLoading(false);
        })
        .catch(() => {
          setBook(null);
          setLoading(false);
        });
    } else {
      // Try local book by ISBN first
      fetch(`http://localhost:8080/api/books/isbn/${idOrIsbn}`)
        .then((res) => {
          if (res.ok) return res.json();
          // If not found, fallback to Open Library
          return fetch(`https://openlibrary.org/isbn/${idOrIsbn}.json`).then(r => r.ok ? r.json() : null);
        })
        .then((data) => {
          setBook(data);
          setIsLocal(!!data && !!(data as LocalBook).id);
          setLoading(false);
        })
        .catch(() => {
          setBook(null);
          setLoading(false);
        });
    }
  }, [idOrIsbn]);

  const getDescription = (desc: string | { value: string } | undefined) => {
    if (!desc) return "N/A";
    if (typeof desc === "string") return desc;
    if (typeof desc === "object" && desc !== null && "value" in desc) return desc.value;
    return "N/A";
  };

  if (loading) return <div className="p-4 text-[#5b3921]">Loading...</div>;
  if (!book) return <div className="p-4 text-[#5b3921]">Book not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <div className="w-full max-w-xl bg-white/90 rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2 text-[#5b3921]">{book.title}</h1>
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-4">
          {/* Show cover */}
          {isLocal && (book as LocalBook).coverUrl ? (
            <Image
              src={(book as LocalBook).coverUrl!}
              alt={(book as LocalBook).title || "Book cover"}
              width={160}
              height={240}
              className="w-40 h-auto rounded shadow border-2 border-[#c2b280] bg-[#f5ecd7]"
              unoptimized
            />
          ) : (
            <Image
              src={`https://covers.openlibrary.org/b/isbn/${idOrIsbn}-L.jpg`}
              alt={(book as OpenLibraryBook).title || "Book cover"}
              width={160}
              height={240}
              className="w-40 h-auto rounded shadow border-2 border-[#c2b280] bg-[#f5ecd7]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback-cover.png";
              }}
            />
          )}
          <div>
            <p className="text-gray-700 mb-1">
              <strong>Author:</strong>{" "}
              {isLocal
                ? (book as LocalBook).author
                : (book as OpenLibraryBook).authors
                ? (book as OpenLibraryBook).authors!.map(a => a.name).join(", ")
                : "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Genre:</strong>{" "}
              {isLocal ? (book as LocalBook).genre : "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Published:</strong>{" "}
              {isLocal
                ? "N/A"
                : (book as OpenLibraryBook).publish_date || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Pages:</strong>{" "}
              {isLocal
                ? "N/A"
                : (book as OpenLibraryBook).number_of_pages || "N/A"}
            </p>
          </div>
        </div>
        <p className="mt-4 text-[#5b3921]">
          {isLocal
            ? (book as LocalBook).description
            : getDescription((book as OpenLibraryBook).description)}
        </p>
      </div>
    </div>
  );
}