"use client";
import React, { useState } from "react";
import type { book } from "~/types/BookType";
import Book from "../ui/book";
import { Button } from "../ui/button";

function BookSection() {
  const [selectedOption, setSelectedOption] = useState(1);
  let books: book[] = [
    {
      id: "1",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: "2",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: "3",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: "4",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: "5",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    },
    {
      id: "5",
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
    <div className="mt-4 rounded-lg bg-white p-2 px-5">
      <div className="flex gap-1 py-5">
        <Button
          onClick={() => onSelectedChange(1)}
          variant={"ghost"}
          className={`w-[100px] cursor-pointer rounded-full ${selectedOption == 1 ? "bg-[#273a51] text-white" : "bg-[#f1f6ff] text-black"}`}
        >
          Popular
        </Button>
        <Button
          onClick={() => onSelectedChange(2)}
          className={`w-[100px] cursor-pointer rounded-full ${selectedOption == 2 ? "bg-[#273a51] text-white" : "bg-[#f1f6ff] text-black"}`}
        >
          Trending
        </Button>
        <Button
          onClick={() => onSelectedChange(3)}
          className={`w-[100px] cursor-pointer rounded-full ${selectedOption == 3 ? "bg-[#273a51] text-white" : "bg-[#f1f6ff] text-black"}`}
        >
          New
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {books.map((book, index) => (
          <Book key={book.id?.toString() || index} BookProps={book} />
        ))}
      </div>
    </div>
  );
}

export default BookSection;
