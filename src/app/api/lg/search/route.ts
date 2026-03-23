import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("req") || "books";

  const params = new URLSearchParams({
    q: query,
    limit: "10",
  });

  try {
    const res = await fetch(`https://libgen.li/index.php?req=${query}`);
    const html = await res.text();

    const mirrorRegex = /ads\.php\?md5=([a-f0-9]{32})/i;
    const match = html.match(mirrorRegex);

    if (match) {
      const res1 = await fetch(`https://libgen.li/ads.php?md5=${match[1]}`);
      const html1 = await res1.text();
      
      // Robust regex to find the actual download URL (containing get.php)
      const downloadRegex = /href=["']([^"']*?get\.php[^"']*?)["']/i;
      const downloadMatch = html1.match(downloadRegex);

      let downloadUrl = "";
      if (downloadMatch?.[1]) {
        downloadUrl = downloadMatch[1].startsWith("http") 
          ? downloadMatch[1] 
          : `https://libgen.li/${downloadMatch[1]}`;
      }
      return NextResponse.json({
        downloadUrl,
        results: [
          {
            title: query,
            mirror: downloadUrl,
          },
        ],
      });
    }

    return NextResponse.json({ results: [] });
  } catch (error) {
    console.error("Open Library proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
