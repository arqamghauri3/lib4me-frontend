import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "books";
  
  const params = new URLSearchParams({
    q: query,
    limit: "10",
    fields: "key,title,author_name,first_publish_year,publisher,number_of_pages_median,ratings_average,ratings_count,cover_i",
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

    const books = data.docs.map((book: any) => ({
      id: book.key.replace("/works/", ""),
      key: book.key,
      title: book.title || null,
      authors: book.author_name || [],
      releaseDate: book.first_publish_year || null,
      rating: book.ratings_average?.toFixed(1) || null,
      ratingsCount: book.ratings_count || null,
      publisher: book.publisher?.[0] || null,
      pages: book.number_of_pages_median || null,
      image: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      url: book.key ? `https://openlibrary.org${book.key}` : null,
    }));

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Open Library proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
