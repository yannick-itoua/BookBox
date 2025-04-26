export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  genre: string;
  available: boolean;
  coverUrl?: string | null;
  ownerId?: number;
  borrowerId?: number | null;
};