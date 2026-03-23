"use client";
import React, { useEffect, useState } from "react";
import type { book } from "~/types/BookType";
import Book from "../ui/book";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
function BookSection() {
  const [selectedOption, setSelectedOption] = useState(2);

  const searchBook = async (option: number) => {
    const endpoint =
      option === 1
        ? "/api/libgen/popular"
        : option === 2
          ? "/api/libgen/trending"
          : "/api/libgen/search?query=new+books";
    const res = await fetch(endpoint);

    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  };

  const {
    data: booksData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["books", selectedOption],
    queryFn: () => searchBook(selectedOption),
  });
  useEffect(() => {
    console.log(booksData);
  }, [booksData]);
  const books: book[] =
    booksData?.books?.map((b: any) => ({
      id: b.id,
      name: b.title,
      author: Array.isArray(b.authors)
        ? b.authors.join(", ")
        : b.authors || "Unknown Author",
      genre: b.genres || [],
      image: b.image || "/placeholder-book.jpg",
    })) || [];

  if (isPending)
    return (
      <div className="p-10 text-center font-serif text-xl">
        Loading trending books...
      </div>
    );

  const onSelectedChange = (value: number) => {
    setSelectedOption(value);
  };
  return (
    <div className="bg-card border-border/40 text-foreground w-full rounded-2xl border p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] lg:p-10">
      <div className="border-border/40 mb-8 flex gap-4 border-b pb-6">
        <Button
          onClick={() => onSelectedChange(1)}
          variant={"ghost"}
          className={`w-[110px] cursor-pointer rounded-full font-serif text-sm font-semibold transition-all duration-300 ${selectedOption == 1 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"}`}
        >
          Popular
        </Button>
        <Button
          onClick={() => onSelectedChange(2)}
          variant={"ghost"}
          className={`w-[110px] cursor-pointer rounded-full text-sm font-semibold transition-all duration-300 ${selectedOption == 2 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"}`}
        >
          Trending
        </Button>
        <Button
          onClick={() => onSelectedChange(3)}
          variant={"ghost"}
          className={`w-[110px] cursor-pointer rounded-full text-sm font-semibold transition-all duration-300 ${selectedOption == 3 ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"}`}
        >
          New
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {error ? (
          <div className="text-destructive p-10 text-center font-serif text-xl">
            Error loading books
          </div>
        ) : (
          books.map((book, index) => (
            <Link key={book.id?.toString() || index} href={`/book/${book.id}`}>
              <Book BookProps={book} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BookSection;
