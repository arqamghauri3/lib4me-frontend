import { NextResponse, type NextRequest } from "next/server";
import { searchOpenLibrary } from "~/lib/openlibrary";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "books";
  
  try {
    const books = await searchOpenLibrary(query);
    return NextResponse.json({ books });
  } catch (error) {
    console.error("Open Library proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
