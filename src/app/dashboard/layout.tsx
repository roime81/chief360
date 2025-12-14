import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/app/header";
import { AppSidebar } from "@/components/app/app-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 bg-background">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
