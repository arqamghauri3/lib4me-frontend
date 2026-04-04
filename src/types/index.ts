export type Author = {
  name: string;
  key: string;
};

export type Genre = {
  name: string;
  key: string;
};

export type LibraryBook = {
  title: string;
  key: string;
  author: Author;
  image: string;
  description: string;
  pages: number;
  ratings: number;
  releaseDate: number;
  publisher: string;
  genreList: Genre[];
  progress?: number; // legacy for dummy data compatibility
  pagesRead?: number; // legacy for dummy data compatibility
};

export type LibraryBooks = {
  id: number;
  book: LibraryBook;
  status: "READING" | "COMPLETED" | "WANT_TO_READ";
  startedAt: string | null;
  finishedAt: string | null;
  readPages: number | null;
  notes: string | null;
};

export type Library = {
  id: number;
  created_at: string | null;
  modified_at: string | null;
  books: LibraryBooks[];
};