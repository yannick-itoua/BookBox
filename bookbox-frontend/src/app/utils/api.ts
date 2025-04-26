const API_BASE = "http://localhost:8080/api";

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function fetchBook(id: number | string) {
  const res = await fetch(`${API_BASE}/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchUser(id: number | string) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
