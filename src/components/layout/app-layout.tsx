import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { ToastContainer } from "react-toastify";

export default function AppLayout() {
  return (
    <>
    <ToastContainer
  position="top-right"
  autoClose={4000}
  newestOnTop
  closeOnClick={false}
  pauseOnHover
  theme="colored"
/>
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarInset className="min-w-0">
        <AppHeader />

        <main className="flex-1 min-w-0 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  </>
  );
}
