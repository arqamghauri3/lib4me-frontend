import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing book key" }, { status: 400 });
  }

  const params = new URLSearchParams({
    q: `key:/works/${id}`,
    limit: "1",
    fields: "key,title,author_name,first_publish_year,publisher,number_of_pages_median,ratings_average,ratings_count,cover_i,description,subject,isbn",
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
    let extraData: any = {};
    const book = {
      id: bookData.key.replace("/works/", ""),
      key: bookData.key,
      title: bookData.title || extraData.title || null,
      authors: bookData.author_name || extraData.authors || [],
      releaseDate: bookData.first_publish_year || extraData.publishedDate?.split("-")[0] || null,
      rating: bookData.ratings_average?.toFixed(1) || extraData.averageRating?.toFixed(1) || null,
      ratingsCount: bookData.ratings_count || extraData.ratingsCount || null,
      publisher: bookData.publisher?.[0] || extraData.publisher || null,
      pages: bookData.number_of_pages_median || extraData.pageCount || null,
      image: bookData.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
        : extraData.imageLinks?.thumbnail || null,
      description: bookData?.description || extraData.description?.replace(/<[^>]*>?/gm, "") || "No description available.",
      genres: bookData.subject?.slice(0, 4) || extraData.categories?.slice(0, 4) || [],
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
