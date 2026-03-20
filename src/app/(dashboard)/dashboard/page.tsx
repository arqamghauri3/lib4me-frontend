import Topbar from "~/components/dashboard/Topbar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/Sidebar";
import type { book } from "~/types/BookType";
import Book from "~/components/ui/book";
import BookSection from "~/components/dashboard/BookSection";

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <div className="flex w-full bg-white py-4">
          <SidebarTrigger />
          <Topbar />
        </div>
        <div className="grid grid-cols-3 gap-3 px-5">
          <div className="col-span-2">
            <BookSection />
          </div>
          <div className="col-span-1">
            <BookSection />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Page;
