import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col pt-12 pb-24 font-sans">
      <div className="mx-auto flex w-full flex-col gap-10 px-6 lg:px-10">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-64 lg:w-96" />
          <Skeleton className="h-6 w-48 italic" />
        </div>

        {/* Layout Grid Skeleton */}
        <div className="mt-2 grid w-full grid-cols-1 gap-12 xl:grid-cols-12">
          {/* Left Side (Featured & Book Grid) */}
          <div className="flex flex-col gap-10 xl:col-span-8">
            {/* Featured Banner Skeleton */}
            <div className="bg-card border-border/40 flex w-full flex-col items-center overflow-hidden rounded-2xl border md:flex-row md:items-stretch h-[400px]">
              {/* Cover Side */}
              <div className="bg-secondary/30 flex w-full items-center justify-center p-10 md:w-[35%] lg:w-[30%]">
                <Skeleton className="aspect-2/3 w-40 md:w-48 shadow-lg" />
              </div>
              {/* Content Side */}
              <div className="flex w-full flex-col justify-center p-10 md:w-[65%] lg:w-[70%] lg:p-14 gap-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-12 w-48 mt-6 rounded-full" />
              </div>
            </div>

            {/* Book Section Skeleton */}
            <div className="bg-card border-border/40 w-full rounded-2xl border p-6 lg:p-10">
              <div className="mb-8 flex gap-4 border-b border-border/40 pb-6">
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-2/3 w-full rounded-sm" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side (Sidebar Blocks) */}
          <div className="mt-2 flex flex-col gap-10 xl:col-span-4">
            {/* Reading Goal Skeleton */}
            <div className="bg-card border-border/40 flex flex-col gap-5 rounded-2xl border p-8">
              <Skeleton className="h-8 w-1/2 mb-2" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-15" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>

            {/* Explore Genres Skeleton */}
            <div className="bg-card border-border/40 flex flex-col gap-6 rounded-2xl border p-8">
              <Skeleton className="h-8 w-1/2" />
              <div className="flex flex-wrap gap-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Popular Authors Skeleton */}
            <div className="bg-card border-border/40 flex flex-col gap-8 rounded-2xl border p-8">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex flex-col gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Books Skeleton */}
            <div className="bg-card border-border/40 flex flex-col gap-8 rounded-2xl border p-8">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex flex-col gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <Skeleton className="aspect-2/3 w-14 shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
