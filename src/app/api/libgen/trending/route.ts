import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`https://openlibrary.org/trending/daily.json?limit=10`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Open Library" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const books = (data.works || []).map((book: any) => ({
      id: book.key.replace("/works/", ""),
      key: book.key,
      title: book.title || null,
      authors: book.author_name || [],
      releaseDate: book.first_publish_year || null,
      rating: book.ratings_average?.toFixed(1) || null,
      ratingsCount: book.ratings_count || null,
      publisher: book.publisher?.[0] || null,
      description: book.description || null,
      pages: book.number_of_pages_median || null,
      image: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      genres: book.subject?.slice(0, 4) || [],
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
