"use client";

import Image from "next/image";
import { Bookmark, Share2, Download, Loader, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { Library, LibraryBook } from "~/types";
import axios from "axios";
import { Spinner } from "~/components/ui/spinner";
const fetchBookDetail = async (id: string) => {
  const res = await fetch(`/api/libgen/detail?id=${id}`);

  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

const fetchBookLg = async (query: string | undefined) => {
  const res = await fetch(`/api/lg/search?req=${query}`);

  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};
const Page = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const {
    data: booksData,
    isLoading: isBookLoading,
    error,
  } = useQuery<LibraryBook>({
    queryKey: ["book", params.id],
    queryFn: () => fetchBookDetail(params.id),
    enabled: !!params.id,
  });

  const { data: bookLg } = useQuery({
    queryKey: ["bookLg", booksData?.title],
    queryFn: () =>
      fetchBookLg(
        booksData?.title +
          " " +
          booksData?.author.name +
          " " +
          booksData?.publisher,
      ),
    enabled: !!booksData?.title,
  });

  const { data: libraryBooks } = useQuery<Library>({
    queryKey: ["libraryBooks"],
    queryFn: async () => {
      return (await fetch("/api/library")).json();
    },
  });

  const addToLib = async (data: LibraryBook | undefined) => {
    const res = await axios.post("/api/library", data);
    return res;
  };
  const { mutate: addBookToLib, isPending: isAdding } = useMutation({
    mutationFn: addToLib,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });

  const bookCheck = libraryBooks?.books.filter(
    (book) => book.book.key === booksData?.key,
  );
  const isBookinLib = !!libraryBooks && (bookCheck?.length ?? 0) === 0;

  useEffect(() => {
    // Sync logic if needed
  }, [libraryBooks, booksData]);

  const book: LibraryBook = {
    key: booksData?.key || "",
    title: booksData?.title || "Unknown Title",
    author: {
      name: booksData?.author.name || "Unknown Author",
      key: booksData?.author.key || "",
    },
    releaseDate: booksData?.releaseDate || 0,
    ratings: booksData?.ratings || 0,
    publisher: booksData?.publisher || "N/A",
    pages: booksData?.pages || 0,
    image: booksData?.image || "",
    description: booksData?.description || "No description available.",
    genreList: booksData?.genreList || [],
  };

  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full flex-col pt-16 font-sans">
      {isBookLoading ? (
        <div className="h-1/2 flex justify-center items-center">
          <Spinner className="size-10" height={15}/>
        </div>
        
      ) : (
        <>
          {/* Top Section - Paper Background */}
          <div className="z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-8 lg:px-12">
            {/* Book Cover */}
            <div className="relative col-span-12 flex justify-center md:col-span-5 lg:col-span-4 lg:col-start-2 lg:justify-end">
              <div className="relative z-20 h-[480px] w-[320px] shrink-0 overflow-hidden rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={book.image}
                  alt="book cover"
                  fill
                  className="object-fill"
                />
              </div>
            </div>

            {/* Title, Author & Summary */}
            <div className="col-span-12 flex flex-col justify-center pt-4 md:col-span-7 md:pt-10 lg:col-span-6">
              <h1 className="mb-6 font-serif text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl lg:text-6xl">
                {book.title}
              </h1>
              <h3 className="mb-4 text-lg font-semibold">{book.author.name}</h3>
            </div>
          </div>

          {/* Bottom Overlapping White Card Section */}
          <div className="bg-card border-border/40 absolute top-[45vh] right-0 bottom-0 left-50 z-0 h-max min-h-[55vh] w-fit grow rounded-xl border-t pt-32 pb-32 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] lg:top-[50vh] lg:pt-24">
            <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-12">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
                {/* Left Column (Stats & Actions) */}
                <div className="flex flex-col gap-10 lg:col-span-4">
                  {/* Purchase / Actions */}
                  {isBookinLib ? (
                    <div className="">
                      <button
                        onClick={() => addBookToLib(booksData)}
                        disabled={isAdding || !booksData}
                        className="bg-primary text-primary-foreground flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-4 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-50"
                      >
                        {isAdding ? "Adding..." : "Add to Library"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <button className="bg-primary text-primary-foreground flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-4 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.02]">
                        Start reading instantly ↗
                      </button>
                      <button
                        onClick={() =>
                          bookLg?.downloadUrl &&
                          window.open(bookLg.downloadUrl, "_blank")
                        }
                        disabled={!bookLg?.downloadUrl}
                        className="bg-secondary text-foreground hover:bg-muted border-border/50 flex w-full cursor-pointer items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold transition-colors disabled:opacity-50"
                      >
                        {bookLg?.downloadUrl
                          ? "Download Now"
                          : "Searching for download..."}
                      </button>
                    </div>
                  )}

                  <div className="border-border/60 border-t pt-8">
                    <h4 className="text-muted-foreground mb-5 text-xs font-bold tracking-wider uppercase">
                      Community & Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="font-serif text-3xl font-normal">
                          {book.ratings}
                        </p>
                        <p className="text-foreground/70 mt-1 text-xs font-semibold">
                          Av. Rating ({book.ratings})
                        </p>
                      </div>
                      <div>
                        <p className="font-serif text-3xl font-normal">
                          {book.releaseDate}
                        </p>
                        <p className="text-foreground/70 mt-1 text-xs font-semibold">
                          Release Year
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-border/60 border-t pt-8">
                    <h4 className="text-muted-foreground mb-5 text-xs font-bold tracking-wider uppercase">
                      Share
                    </h4>
                    <div className="text-foreground/80 flex gap-6">
                      <Bookmark
                        size={24}
                        className="hover:text-primary cursor-pointer transition-colors"
                      />
                      <Share2
                        size={24}
                        className="hover:text-primary cursor-pointer transition-colors"
                      />
                      <Download
                        size={24}
                        className="hover:text-primary cursor-pointer transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column (Reading Content & Reviews) */}
                <div className="flex flex-col gap-16 lg:col-span-8 lg:pl-10">
                  {/* About the Book */}
                  <div className="flex flex-col gap-5">
                    <h3 className="mb-2 font-serif text-3xl font-normal">
                      About the book
                    </h3>
                    <p className="text-foreground/80 text-[15px] leading-relaxed font-medium">
                      {book.description}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="border-border/60 grid grid-cols-1 gap-12 border-t pt-12 md:grid-cols-2">
                    <div className="flex flex-col gap-8">
                      <div>
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                          Publisher
                        </h4>
                        <p className="text-foreground/90 text-[15px] leading-relaxed font-semibold">
                          {book.publisher}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                          Language
                        </h4>
                        <p className="text-foreground/90 text-[15px] leading-relaxed font-semibold">
                          English
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-8">
                      <div>
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                          Pages
                        </h4>
                        <p className="text-foreground/90 text-[15px] leading-relaxed font-semibold whitespace-pre-line">
                          {book.pages}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                          Tags
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {book.genreList.length > 0
                            ? book.genreList.map((t: any) => (
                                <span
                                  key={t.key}
                                  className="bg-secondary text-foreground border-border/50 rounded-full border px-4 py-1.5 text-xs font-bold"
                                >
                                  {t.name}
                                </span>
                              ))
                            : ["Fantasy", "Fiction"].map((t: string) => (
                                <span
                                  key={t}
                                  className="bg-secondary text-foreground border-border/50 rounded-full border px-4 py-1.5 text-xs font-bold"
                                >
                                  {t}
                                </span>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
