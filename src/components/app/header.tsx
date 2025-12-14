"use client";

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/app/user-nav';
import { navItems } from '@/lib/placeholder-data';

export function Header() {
    const pathname = usePathname();
    const currentPage = navItems.find(item => item.href === pathname || (item.href !== '/dashboard' && pathname.startsWith(item.href)));
    const title = currentPage ? currentPage.label : "Dashboard";

    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="font-headline text-xl font-semibold text-foreground">
                    {title}
                </h1>
            </div>
            <UserNav />
        </header>
    );
}
