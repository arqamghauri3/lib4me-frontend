export interface OpenLibraryBook {
  id: string;
  key: string;
  title: string | null;
  authors: string[];
  releaseDate: string | null;
  rating: string | null;
  ratingsCount: number | null;
  publisher: string | null;
  description: string | null;
  pages: number | null;
  image: string | null;
  genres: string[];
  url: string | null;
}

export async function searchOpenLibrary(query: string, limit: number = 10): Promise<OpenLibraryBook[]> {
  const params = new URLSearchParams({
    q: query,
    limit: limit.toString(),
    fields: "key,title,author_name,first_publish_year,publisher,number_of_pages_median,ratings_average,ratings_count,cover_i,subject",
  });

  const res = await fetch(`https://openlibrary.org/search.json?${params}`);
  console.log(`https://openlibrary.org/search.json?${params}`)
  if (!res.ok) {
    throw new Error(`Open Library fetch failed: ${res.statusText}`);
  }

  const data = await res.json();
  
  if (!data || !data.docs) {
    return [];
  }

  return data.docs.map((book: any) => ({
    id: book.key.replace("/works/", ""),
    key: book.key,
    title: book.title || null,
    authors: book.author_name || [],
    releaseDate: book.first_publish_year || null,
    rating: book.ratings_average ? book.ratings_average.toFixed(1) : null,
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
}