"use client";
import React, { useEffect, useState } from "react";
import type { book } from "~/types/BookType";
import Book from "../ui/book";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
function BookSection() {
  const searchBook = async () => {
    const res = await fetch(
      `/api/libgen/trending`,
    );

    if (!res.ok) throw new Error("Search failed");
    return res.json();
  };

  const {
    data: booksData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => searchBook(),
  });
  useEffect(() => {
    console.log(booksData);
  }, [booksData]);
  const [selectedOption, setSelectedOption] = useState(1);
  const books: book[] = booksData?.books?.map((b: any) => ({
    id: b.id,
    name: b.title,
    author: Array.isArray(b.authors) ? b.authors.join(", ") : b.authors || "Unknown Author",
    genre: b.genres || [],
    image: b.image || "/placeholder-book.jpg"
  })) || [];

  if (isPending) return <div className="p-10 text-center font-serif text-xl">Loading trending books...</div>;
  if (error) return <div className="p-10 text-center font-serif text-xl text-destructive">Error loading books</div>;

  const onSelectedChange = (value: number) => {
    setSelectedOption(value);
  };
  return (
    <div className="bg-card rounded-2xl p-6 lg:p-10 border border-border/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] text-foreground w-full">
      <div className="flex gap-4 pb-6 border-b border-border/40 mb-8">
        <Button
          onClick={() => onSelectedChange(1)}
          variant={"ghost"}
          className={`w-[110px] font-serif font-semibold cursor-pointer rounded-full text-sm transition-all duration-300 ${selectedOption == 1 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          Popular
        </Button>
        <Button
          onClick={() => onSelectedChange(2)}
          variant={"ghost"}
          className={`w-[110px] cursor-pointer rounded-full font-semibold text-sm transition-all duration-300 ${selectedOption == 2 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          Trending
        </Button>
        <Button
          onClick={() => onSelectedChange(3)}
          variant={"ghost"}
          className={`w-[110px] cursor-pointer rounded-full font-semibold text-sm transition-all duration-300 ${selectedOption == 3 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          New
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
        {books.map((book, index) => (
          <Link key={book.id?.toString() || index} href={`/book/${book.id}`}>
            <Book BookProps={book} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookSection;
