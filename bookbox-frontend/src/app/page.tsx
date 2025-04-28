import Link from "next/link";

const featuredBooks = [
  { title: "The Hobbit", isbn: "9780547928227" },
  { title: "1984", isbn: "9780451524935" },
  { title: "To Kill a Mockingbird", isbn: "9780061120084" },
  { title: "Pride and Prejudice", isbn: "9780141439518" },
  { title: "Moby Dick", isbn: "9781503280786" },
  { title: "The Great Gatsby", isbn: "9780743273565" },
  { title: "Jane Eyre", isbn: "9780142437209" },
  { title: "War and Peace", isbn: "9780199232765" },
];

const classicBooks = [
  { title: "Crime and Punishment", isbn: "9780140449136" },
  { title: "Brave New World", isbn: "9780060850524" },
  { title: "The Lord of the Rings", isbn: "9780618640157" },
  { title: "Wuthering Heights", isbn: "9780141439556" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-[#f5ecd7] via-[#e3caa5] to-[#a67c52]">
      <h1 className="text-4xl font-bold mb-6 text-[#5b3921] drop-shadow">Welcome to BookBox 📚</h1>
      <p className="mb-8 text-lg text-[#7c5e3c] text-center max-w-xl">
        Manage your books, users, and lending with ease. Use the navigation below to get started.
      </p>
      {/* Featured Book Covers */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {featuredBooks.map((book) => (
          <div key={book.isbn} className="flex flex-col items-center">
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              alt={book.title}
              className="w-24 h-36 object-cover rounded shadow-lg border-2 border-[#c2b280] bg-[#f5ecd7]"
            />
            <span className="mt-2 text-sm text-center text-[#7c5e3c]">{book.title}</span>
          </div>
        ))}
      </div>
      {/* More Covers Section */}
      <div className="w-full max-w-4xl bg-[#f5ecd7] rounded-lg shadow p-6 mb-10 border border-[#c2b280]">
        <h2 className="text-2xl font-semibold mb-4 text-[#5b3921]">Classics You Might Like</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          {classicBooks.map((book) => (
            <div key={book.isbn} className="flex flex-col items-center">
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                alt={book.title}
                className="w-20 h-32 object-cover rounded shadow border-2 border-[#c2b280] bg-[#f5ecd7]"
              />
              <span className="mt-2 text-xs text-center text-[#7c5e3c]">{book.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/books"
          className="bg-[#a67c52] text-white px-6 py-3 rounded shadow hover:bg-[#7c5e3c] transition"
        >
          View Books
        </Link>
        <Link
          href="/users"
          className="bg-[#c2b280] text-[#5b3921] px-6 py-3 rounded shadow hover:bg-[#a67c52] transition"
        >
          View Users
        </Link>
        <Link
          href="/users/login"
          className="bg-[#5b3921] text-white px-6 py-3 rounded shadow hover:bg-[#7c5e3c] transition"
        >
          Login
        </Link>
        <Link
          href="/users/register"
          className="bg-[#e3caa5] text-[#5b3921] px-6 py-3 rounded shadow hover:bg-[#c2b280] transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
