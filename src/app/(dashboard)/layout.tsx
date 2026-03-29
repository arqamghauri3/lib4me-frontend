import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/Sidebar";
import Topbar from "~/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <div className="bg-background flex w-full py-4">
          <Topbar />
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
