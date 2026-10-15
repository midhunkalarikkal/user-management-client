import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { navigationItems } from "@/utils/constant";
import useLogout from "@/hooks/mutations/auth/use-logout";
import { LogOut, LoaderCircle, UsersRound } from "lucide-react";

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: logout, isPending } = useLogout();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b">
        <div className="flex h-12 items-center gap-3 px-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-black text-white">
            <UsersRound className="size-5" />
          </div>

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">User Management</p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive =
                  item.url === "/users"
                    ? pathname === "/users" ||
                      (pathname.startsWith("/users/") && pathname !== "/users/new")
                    : pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      render={<Link to={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              disabled={isPending}
              tooltip={isPending ? "Logging out..." : "Logout"}
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              {isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}

              <span>{isPending ? "Logging out..." : "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
