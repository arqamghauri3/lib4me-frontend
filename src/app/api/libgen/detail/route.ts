import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing book key" }, { status: 400 });
  }

  // We search by key to get the same mapped fields as the search results
  const params = new URLSearchParams({
    q: `key:/works/${id}`,
    limit: "1",
    fields: "key,title,author_name,first_publish_year,publisher,number_of_pages_median,ratings_average,ratings_count,cover_i,description",
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

    const book = {
      id: bookData.key.replace("/works/", ""),
      key: bookData.key,
      title: bookData.title || null,
      authors: bookData.author_name || [],
      releaseDate: bookData.first_publish_year || null,
      rating: bookData.ratings_average?.toFixed(1) || null,
      ratingsCount: bookData.ratings_count || null,
      publisher: bookData.publisher?.[0] || null,
      pages: bookData.number_of_pages_median || null,
      image: bookData.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
        : null,
      description: bookData.description?.[0] || "No description available.",
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
