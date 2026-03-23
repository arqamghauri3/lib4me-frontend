"use client";
import React, { useState } from "react";
import type { book } from "~/types/BookType";
import Book from "../ui/book";
import { Button } from "../ui/button";
import Link from "next/link";

function BookSection() {
  const [selectedOption, setSelectedOption] = useState(1);
  let books: book[] = [
    {
      id: 1,
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: 2,
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: 3,
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: 4,
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: 5,
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
  ];

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
