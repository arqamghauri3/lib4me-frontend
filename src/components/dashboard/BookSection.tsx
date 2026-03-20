import React from "react";
import type { book } from "~/types/BookType";
import Book from "../ui/book";

function BookSection() {
  let books: book[] = [
    {
      id: "1",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://jamesclear.com/wp-content/uploads/2025/06/atomic-habits-dots.png",
    },
    {
      id: "2",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://jamesclear.com/wp-content/uploads/2025/06/atomic-habits-dots.png",
    },
    {
      id: "3",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://jamesclear.com/wp-content/uploads/2025/06/atomic-habits-dots.png",
    },
    {
      id: "4",
      name: "Atomic Habits",
      author: "James Clear",
      genre: ["Productivity"],
      image:
        "https://jamesclear.com/wp-content/uploads/2025/06/atomic-habits-dots.png",
    },
  ];
  return (
    <div className="bg-white p-2 mt-4 rounded-lg">
      <div className="flex gap-3">
        {books.map((book, index) => (
          <Book key={book.id?.toString() || index} BookProps={book} />
        ))}
      </div>
    </div>
  );
}

export default BookSection;
