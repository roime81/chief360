"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppWindow } from "lucide-react";

import { navItems } from "@/lib/placeholder-data";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <AppWindow className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
                <h2 className="font-headline text-lg font-semibold">Orchestrator</h2>
                <p className="text-xs text-muted-foreground">360</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
