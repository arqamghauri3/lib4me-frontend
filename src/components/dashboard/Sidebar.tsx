import { Bookmark, Compass, Home, Settings, Navigation, Library } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="w-[80px] min-w-[80px] border-r-0">
      <SidebarHeader className="flex flex-col items-center justify-center py-8">
        <Navigation size={28} strokeWidth={1.5} className="text-foreground" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center mt-6">
        <SidebarGroup className="w-full flex flex-col items-center gap-6">
          <SidebarMenuItem className="list-none flex justify-center w-full">
            <SidebarMenuButton className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors" asChild>
              <a href="/dashboard">
                <Home size={22} strokeWidth={1.5} className="text-foreground/80 hover:text-foreground" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none flex justify-center w-full">
            <SidebarMenuButton className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors" asChild>
              <a href="#">
                <Compass size={22} strokeWidth={1.5} className="text-foreground/80 hover:text-foreground" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none flex justify-center w-full">
            <SidebarMenuButton className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors" asChild>
              <a href="/library">
                <Library size={22} strokeWidth={1.5} className="text-foreground/80 hover:text-foreground" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none flex justify-center w-full">
            <SidebarMenuButton className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors" asChild>
              <a href="#">
                <Bookmark size={22} strokeWidth={1.5} className="text-foreground/80 hover:text-foreground" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none flex justify-center w-full">
            <SidebarMenuButton className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors" asChild>
              <a href="#">
                <Settings size={22} strokeWidth={1.5} className="text-foreground/80 hover:text-foreground" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
