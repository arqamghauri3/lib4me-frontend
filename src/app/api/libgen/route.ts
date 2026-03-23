import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const libgenUrl = new URL("https://libgen.li/json.php");

  searchParams.forEach((value, key) => {
    libgenUrl.searchParams.set(key, value);
  });

  try {
    const response = await fetch(libgenUrl.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Libgen" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Libgen proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
