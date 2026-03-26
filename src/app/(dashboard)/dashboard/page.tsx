import { NextResponse } from "next/server";
import Content from "./content";
import { searchOpenLibrary } from "~/lib/openlibrary";

async function Page() {
  const suggestedBooks = await searchOpenLibrary("suggested");
  const trendingBooks = await searchOpenLibrary("trending");
  const popularBooks = await searchOpenLibrary("popular");
  const newBooks = await searchOpenLibrary("new");
  const contentProps = {
    bookData: {
      suggestedBooks,
      trendingBooks,
      popularBooks,
      newBooks,
    },
  };
  return <Content ContentProps={contentProps} />;
}
export default Page;
