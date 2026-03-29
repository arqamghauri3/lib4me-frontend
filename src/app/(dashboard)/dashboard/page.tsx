import { NextResponse } from "next/server";
import Content from "./content";
import { searchOpenLibrary } from "~/lib/openlibrary";

async function Page() {
    const suggestedBooks = searchOpenLibrary("suggested");
    const trendingBooks  = searchOpenLibrary("trending");
    const popularBooks   = searchOpenLibrary("popular");
    const newBooks       = searchOpenLibrary("new");

    const promises = [suggestedBooks, trendingBooks, popularBooks, newBooks];
    const settled: PromiseSettledResult<any>[] = await Promise.allSettled(promises);
    const [suggestedResult, trendingResult, popularResult, newResult] = settled;
    const contentProps = {
        bookData: {
            suggestedBooks: suggestedResult?.status === "fulfilled" ? suggestedResult.value : null,
            trendingBooks:  trendingResult?.status  === "fulfilled" ? trendingResult.value  : null,
            popularBooks:   popularResult?.status   === "fulfilled" ? popularResult.value   : null,
            newBooks:       newResult?.status       === "fulfilled" ? newResult.value       : null,
        },
        // optionally include errors
        // errors: settled
        //     .map((r, i) => (r.status === "rejected" ? { index: i, reason: r.reason } : null))
        //     .filter(Boolean),
    };

    return <Content ContentProps={contentProps} />;
}
export default Page;
