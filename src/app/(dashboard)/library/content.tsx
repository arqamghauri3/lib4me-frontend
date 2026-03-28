"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Star,
  BookMarked,
  Clock,
  CheckCircle2,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Library, LibraryBooks } from "~/types";



const dummyBooks: LibraryBooks[] = [
  {
    id: 1,
    status: "READING",
    startedAt: "2026-03-01",
    finishedAt: null,
    readPages: 376,
    notes: null,
    book: {
      title: "Harry Potter and the Half-Blood Prince",
      key: "OL7353617M",
      author: { name: "J.K. Rowling", key: "OL23919A" },
      image: "https://covers.openlibrary.org/b/id/8234817-L.jpg",
      description: "Harry Potter and the Half-Blood Prince is a fantasy novel...",
      pages: 607,
      ratings: 4.6,
      releaseDate: 2005,
      publisher: "Bloomsbury",
      genreList: [{ name: "Fantasy", key: "fantasy" }],
    },
  },
  {
    id: 2,
    status: "READING",
    startedAt: "2026-03-10",
    finishedAt: null,
    readPages: 225,
    notes: null,
    book: {
      title: "The Name of the Wind",
      key: "OL8479946M",
      author: {  name: "Patrick Rothfuss", key: "OL4336142A" },
      image: "https://covers.openlibrary.org/b/id/8235174-L.jpg",
      description: "The Name of the Wind is a heroic fantasy novel...",
      pages: 662,
      ratings: 4.5,
      releaseDate: 2007,
      publisher: "DAW Books",
      genreList: [{  name: "Fantasy", key: "fantasy" }],
    },
  },
  {
    id: 3,
    status: "completed",
    startedAt: "2026-01-01",
    finishedAt: "2026-01-15",
    readPages: 412,
    notes: null,
    book: {
      title: "Dune",
      key: "OL44247403M",
      author: {  name: "Frank Herbert", key: "OL21516A" },
      image: "https://covers.openlibrary.org/b/id/8225263-L.jpg",
      description: "Dune is a science fiction novel...",
      pages: 412,
      ratings: 4.8,
      releaseDate: 1965,
      publisher: "Chilton Books",
      genreList: [{  name: "Sci-Fi", key: "sci-fi" }],
    },
  },
];

const filterTabs = [
  { key: "all", label: "All Books", icon: BookMarked },
  { key: "READING", label: "Reading", icon: BookOpen },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "want-to-read", label: "Want to Read", icon: Clock },
];

const statusConfig = {
  READING: {
    label: "Reading",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "want-to-read": {
    label: "Want to Read",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-amber-400 text-amber-400" />
      <span className="text-foreground/70 text-xs font-semibold">{rating}</span>
    </div>
  );
}

function BookCard({
  book,
}: {
  book: LibraryBooks;
}) {
  const status = statusConfig[book.status];
  return (
    <Link href={`/book/${book.book.key}`}>
      <div className="bg-card border-border/40 group flex cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]">
        {/* Cover */}
        <div
          className="bg-secondary/40 relative w-full overflow-hidden"
          style={{ aspectRatio: "2/3" }}
        >
          <Image
            src={book.book.image}
            alt={book.book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm ${status.color} bg-card/80`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          {/* More button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="bg-card/80 border-border/40 absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-bold">
                {book.book.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs font-semibold italic">
                {book.book.author.name}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <StarRating rating={book.book.ratings} />
            <span className="bg-secondary text-foreground/70 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
              {book.book.genreList[0]?.name || "N/A"}
            </span>
          </div>

          {/* Progress bar for "READING" */}
          {book.status === "READING" && book.readPages !== null && (
            <div className="mt-1 flex flex-col gap-1.5">
              <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.round((book.readPages / book.book.pages) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-muted-foreground flex justify-between text-[10px] font-semibold">
                <span>{book.readPages} pages read</span>
                <span>
                  {Math.round((book.readPages / book.book.pages) * 100)}%
                </span>
              </div>
            </div>
          )}
          {book.status === "completed" && (
            <div className="text-muted-foreground mt-0.5 text-[10px] font-semibold">
              {book.book.pages} pages · Finished
            </div>
          )}
          {book.status === "want-to-read" && (
            <div className="text-muted-foreground mt-0.5 text-[10px] font-semibold">
              {book.book.pages} pages
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function Content() {
  const { data: libraryBooks } = useQuery<Library>({
    queryKey: ["libraryBooks"],
    queryFn: async () => {
      return (await fetch("/api/library")).json();
    },
  });

  useEffect(() => {
    console.log(libraryBooks);
  }, [libraryBooks]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const books = libraryBooks?.books || dummyBooks;

  const filteredBooks = books.filter((b) => {
    const matchesFilter = activeFilter === "all" || b.status === activeFilter;
    const matchesSearch =
      b.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.book.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: books.length,
    reading: books.filter((b) => b.status === "READING").length,
    completed: books.filter((b) => b.status === "completed").length,
    wantToRead: books.filter((b) => b.status === "want-to-read").length,
    totalPagesRead: books
      .filter((b) => b.status === "completed")
      .reduce((acc, b) => acc + b.book.pages, 0),
  };

  const currentlyReading = books.filter((b) => b.status === "READING");

  return (
    <div className="bg-background text-foreground min-h-screen w-full pt-12 pb-24 font-sans">
      <div className="mx-auto flex w-full max-w-none flex-col gap-10 px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl font-normal tracking-tight lg:text-5xl">
            My Library
          </h1>
          <p className="text-muted-foreground text-lg font-semibold italic">
            {stats.total} books across your collection
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Total Books",
              value: stats.total,
              icon: BookMarked,
              color: "text-foreground",
            },
            {
              label: "Reading Now",
              value: stats.reading,
              icon: BookOpen,
              color: "text-blue-500",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
              color: "text-emerald-500",
            },
            {
              label: "Pages Read",
              value: stats.totalPagesRead.toLocaleString(),
              icon: Star,
              color: "text-amber-500",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-card border-border/40 flex flex-col gap-3 rounded-2xl border p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
            >
              <Icon size={20} className={color} strokeWidth={1.5} />
              <div>
                <p className={`font-serif text-3xl font-normal ${color}`}>
                  {value}
                </p>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Reading */}
        {currentlyReading.length > 0 && (
          <div className="bg-card border-border/40 flex flex-col gap-6 rounded-2xl border p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] lg:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-normal">
                Currently Reading
              </h2>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-semibold transition-colors">
                See all <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {currentlyReading.map((book) => (
                <Link key={book.id} href={`/book/${book.book.key}`}>
                  <div className="group hover:bg-muted/50 flex cursor-pointer items-center gap-5 rounded-xl p-3 transition-colors">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-sm shadow-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                      <Image
                        src={book.book.image}
                        alt={book.book.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div>
                        <h3 className="text-foreground line-clamp-1 text-sm font-bold">
                          {book.book.title}
                        </h3>
                        <p className="text-muted-foreground text-xs font-semibold italic">
                          {book.book.author.name}
                        </p>
                      </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${Math.round((book.readPages! / book.book.pages) * 100)}%`,
                              }}
                            />
                          </div>
                          <div className="text-muted-foreground flex justify-between text-[11px] font-semibold">
                            <span>
                              Page {book.readPages} of {book.book.pages}
                            </span>
                            <span className="text-primary font-bold">
                              {Math.round((book.readPages! / book.book.pages) * 100)}%
                            </span>
                          </div>
                        </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Filter Tabs */}
          <div className="bg-secondary/50 flex gap-1 rounded-full p-1">
            {filterTabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} strokeWidth={2} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Search + sort */}
          <div className="flex items-center gap-3">
            <div className="bg-card border-border/40 relative flex items-center gap-2 rounded-full border px-4 py-2.5 shadow-sm">
              <Search size={14} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="placeholder:text-muted-foreground w-44 bg-transparent text-sm font-semibold outline-none placeholder:font-normal"
              />
            </div>
            <button className="bg-card border-border/40 text-muted-foreground hover:text-foreground flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-colors">
              <SlidersHorizontal size={16} />
            </button>
            <button className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90">
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredBooks.map((book) => (
              <BookCard key={book.book.key} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-card border-border/40 flex flex-col items-center justify-center gap-4 rounded-2xl border py-20 text-center">
            <BookMarked
              size={40}
              className="text-muted-foreground/40"
              strokeWidth={1}
            />
            <div>
              <p className="font-serif text-xl font-normal">No books found</p>
              <p className="text-muted-foreground mt-1 text-sm font-semibold">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "Add some books to get started"}
              </p>
            </div>
            <button className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90">
              <Plus size={16} /> Add Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
