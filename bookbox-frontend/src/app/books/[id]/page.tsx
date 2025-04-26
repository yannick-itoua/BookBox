import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  available: boolean;
  coverUrl?: string | null;
  ownerId?: number;
  borrowerId?: number | null;
};

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!book) return <div className="p-4">Book not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-700 mb-1">Author: {book.author}</p>
      <p className="text-gray-700 mb-1">Genre: {book.genre}</p>
      <p className="text-gray-700 mb-1">Available: {book.available ? "Yes" : "No"}</p>
      {book.coverUrl && (
        <img src={book.coverUrl} alt={book.title} className="my-4 w-48 h-auto rounded shadow" />
      )}
      <p className="mt-4">{book.description}</p>
    </div>
  );
}