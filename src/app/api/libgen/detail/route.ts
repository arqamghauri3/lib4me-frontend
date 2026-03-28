import { NextResponse, type NextRequest } from "next/server";
import type { LibraryBook } from "~/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing book key" }, { status: 400 });
  }

  const params = new URLSearchParams({
    q: `key:/works/${id}`,
    limit: "1",
    fields: "key,title,author_name,author_key,first_publish_year,publisher,number_of_pages_median,ratings_average,ratings_count,cover_i,description,subject,isbn",
  });

  try {
    const res = await fetch(`https://openlibrary.org/search.json?${params}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Open Library" },
        { status: res.status },
      );
    }

    const data = await res.json();
    const bookData = data.docs[0];

    if (!bookData) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const book: LibraryBook = {
      key: bookData.key.replace("/works/", ""),
      title: bookData.title || "Unknown Title",
      author: {
        name: bookData.author_name?.[0] || "Unknown Author",
        key: bookData.author_key?.[0] || "",
      },
      releaseDate: bookData.first_publish_year || null,
      ratings: bookData.ratings_average?.toFixed(1) || 0,
      publisher: bookData.publisher?.[0] || "N/A",
      pages: bookData.number_of_pages_median || 0,
      image: bookData.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
        : "/placeholder-book.jpg",
      description: bookData?.description || "No description available.",
      genreList: (bookData.subject?.slice(0, 4) || []).map((s: string) => ({
        key: s.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        name: s
      }))
    };

    return NextResponse.json(book);
  } catch (error) {
    console.error("Open Library detail proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
