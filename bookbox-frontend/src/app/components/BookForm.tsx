"use client";
import { useState } from "react";

type BookFormProps = {
  onSubmit: (book: Omit<Book, "id">) => void;
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

export default function BookForm({ onSubmit, initialData = {} }: BookFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [genre, setGenre] = useState(initialData.genre || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [available, setAvailable] = useState(initialData.available ?? true);
  const [coverUrl, setCoverUrl] = useState(initialData.coverUrl || "");
  const [isbn, setIsbn] = useState(initialData.isbn || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      genre,
      description,
      available,
      coverUrl,
      isbn,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Title</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium">Author</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium">Genre</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Cover URL</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={coverUrl}
          onChange={e => setCoverUrl(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">ISBN</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={available}
          onChange={e => setAvailable(e.target.checked)}
          id="available"
          className="mr-2"
        />
        <label htmlFor="available">Available</label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Book
      </button>
    </form>
  );
}