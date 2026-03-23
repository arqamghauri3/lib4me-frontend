"use client";
import BookSection from "~/components/dashboard/BookSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Page = () => {
  const searchLibgen = async ({ type = "title", page = 1 }) => {
    const res = await fetch(
      `/api/libgen?object=e&ids=208398569&fields=Title,Author,MD5,Extension,Filesize`,
    );

    if (!res.ok) throw new Error("Search failed");
    return res.json();
  };

  const searchBook = async () => {
    const res = await fetch(
      `/api/libgen/search?api-key=4d05429686504daaa0d31127ebf1a770&query=trending+books`,
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
  const featuredBook = {
    id: 1,
    name: "Harry Potter: Half Blood Prince",
    author: "JK Rowling",
    summary:
      "The story takes place during Harry's sixth year at Hogwarts School of Witchcraft and Wizardry, where he discovers more about Lord Voldemort's past and the prophecy that foretells his defeat.",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1587697303l/1.jpg",
  };

  const authors = [
    {
      name: "J.K. Rowling",
      role: "Fantasy Fiction",
      image: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
    },
    {
      name: "George R.R. Martin",
      role: "Epic Fantasy",
      image: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
    },
    {
      name: "Brandon Sanderson",
      role: "High Fantasy",
      image: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
    },
    {
      name: "Agatha Christie",
      role: "Mystery & Crime",
      image: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
    },
    {
      name: "Agatha Christie",
      role: "Mystery & Crime",
      image: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
    },
  ];

  const suggestedBooks = [
    {
      id: 2,
      name: "The Alchemist",
      author: "Paulo Coelho",
      year: "1988",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    },
    {
      id: 3,
      name: "1984",
      author: "George Orwell",
      year: "1949",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg",
    },
    {
      id: 4,
      name: "Dune",
      author: "Frank Herbert",
      year: "1965",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col pt-12 pb-24 font-sans">
      <div className="mx-auto flex w-full flex-col gap-10 px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-foreground font-serif text-4xl font-normal tracking-tight lg:text-5xl">
            Good Morning, Alexander Mark
          </h1>
          <p className="text-muted-foreground mt-2 mb-2 text-lg font-semibold italic">
            Here is what you are reading today
          </p>
        </div>

        {/* Layout Grid */}
        <div className="mt-2 grid w-full grid-cols-1 gap-12 xl:grid-cols-12">
          {/* Left Side (Featured & Tabs) */}
          <div className="flex flex-col gap-10 xl:col-span-8">
            {/* Featured Banner */}
            <div className="bg-card border-border/40 group mt-2 flex w-full flex-col items-center overflow-hidden rounded-2xl border shadow-[0_15px_40px_-5px_rgba(0,0,0,0.04)] md:flex-row md:items-stretch">
              {/* Book Cover Side */}
              <div className="bg-secondary/50 flex w-full items-center justify-center p-10 md:w-[35%] lg:w-[30%]">
                <div className="relative aspect-2/3 w-40 overflow-hidden rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-2 md:w-48">
                  <Image
                    src={featuredBook.image}
                    alt="Featured Book"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="flex w-full flex-col justify-center p-10 md:w-[65%] lg:w-[70%] lg:p-14">
                <div className="bg-secondary text-muted-foreground mb-6 inline-block w-max rounded-full px-4 py-1.5 text-xs font-bold tracking-wide tabular-nums">
                  CONTINUE READING
                </div>
                <h2 className="mb-4 font-serif text-3xl leading-tight font-normal lg:text-4xl">
                  {featuredBook.name}
                </h2>
                <p className="text-foreground/80 mb-5 text-lg font-semibold">
                  {featuredBook.author}
                </p>
                <p className="text-muted-foreground mb-10 max-w-xl text-sm leading-relaxed font-semibold italic">
                  "{featuredBook.summary}"
                </p>

                <Link href={"/book/" + featuredBook.id}>
                  <button className="bg-primary text-primary-foreground flex w-max items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90">
                    Continue reading <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Book Sections (Popular, Trending, New) */}
            <div className="">
              <BookSection />
            </div>
          </div>

          {/* Right Side (Authors, Suggestions, Goals) */}
          <div className="mt-2 flex flex-col gap-10 xl:col-span-4">
            {/* Reading Goal Block */}
            <div className="bg-card border-border/40 flex flex-col gap-5 rounded-2xl border p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]">
              <h3 className="font-serif text-2xl font-normal tracking-tight">
                Challenge 2026
              </h3>
              <div className="flex flex-col gap-2">
                <div className="text-foreground/80 mb-1 flex justify-between text-sm font-semibold">
                  <span>12 Books Read</span>
                  <span>20 Goal</span>
                </div>
                {/* Progress Bar Container */}
                <div className="bg-secondary h-3 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-muted-foreground mt-2 text-xs font-semibold italic">
                  You're 2 books ahead of schedule!
                </p>
              </div>
            </div>

            {/* Favorite Genres Block */}
            <div className="bg-card border-border/40 flex flex-col gap-6 rounded-2xl border p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]">
              <h3 className="font-serif text-2xl font-normal tracking-tight">
                Explore Genres
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "High Fantasy",
                  "Mystery",
                  "Sci-Fi",
                  "Historical Fiction",
                  "Romance",
                  "Thriller",
                ].map((genre) => (
                  <div
                    key={genre}
                    className="border-border/60 text-foreground/80 hover:bg-secondary cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Authors Block */}
            <div className="bg-card border-border/40 flex flex-col gap-8 rounded-2xl border p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-normal tracking-tight">
                  Popular Authors
                </h3>
                <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-semibold transition-colors">
                  See all <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {authors.map((author, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer items-center gap-4"
                  >
                    <div className="bg-secondary relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-foreground text-sm font-bold transition-colors">
                        {author.name}
                      </h4>
                      <p className="text-muted-foreground mt-1 text-xs font-semibold">
                        {author.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Books Block */}
            <div className="bg-card border-border/40 flex flex-col gap-8 rounded-2xl border p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-normal tracking-tight">
                  Suggested for You
                </h3>
                <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-semibold transition-colors">
                  See all <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {booksData?.books?.map((book: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="group flex cursor-pointer items-center gap-5"
                    >
                      <div className="bg-secondary relative aspect-2/3 w-14 shrink-0 overflow-hidden rounded-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                        <Link href={`/book/${book.id}`}>
                          <Image
                            src={book?.image}
                            alt={book?.title || "Book cover"}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-foreground line-clamp-2 text-sm leading-tight font-bold">
                          {book?.title}
                        </h4>
                        <p className="text-foreground/70 mt-2 text-xs font-bold">
                          {Array.isArray(book?.authors) ? book.authors.join(", ") : book.authors}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
