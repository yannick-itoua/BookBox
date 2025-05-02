"use client";
import { useState } from "react";

type BookFormProps = {
  onSubmit?: (book: Omit<Book, "id">) => void;
  onBookAdded?: () => void;
  initialData?: Partial<Omit<Book, "id">>;
};

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description?: string;
  available: boolean;
  coverUrl?: string | null;
  ownerId?: number;
  borrowerId?: number | null;
  isbn?: string;
};

export default function BookForm({ onSubmit, onBookAdded, initialData = {} }: BookFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [genre, setGenre] = useState(initialData.genre || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [available, setAvailable] = useState(initialData.available ?? true);
  const [coverUrl, setCoverUrl] = useState(initialData.coverUrl || "");
  const [isbn, setIsbn] = useState(initialData.isbn || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      genre,
      description,
      available,
      coverUrl,
      isbn,
    };
    if (onSubmit) {
      onSubmit(bookData);
    } else {
      // Default: POST to backend
      await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
    }
    if (onBookAdded) onBookAdded();
    // Optionally reset form fields here
    setTitle("");
    setAuthor("");
    setGenre("");
    setDescription("");
    setAvailable(true);
    setCoverUrl("");
    setIsbn("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      {/* ...other fields... */}
      <button type="submit">Add Book</button>
    </form>
  );
}