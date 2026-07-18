"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { navigation } from "@/config/navigation";
import { ROLES } from "@/constants/roles";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const menus = navigation[role] ?? [];

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r bg-white">
            <div className="border-b p-6">
                <h1 className="text-xl font-bold">Desa Cintanagara</h1>

                <p className="text-sm text-muted-foreground">Smart Village</p>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    const active = pathname === menu.href || pathname.startsWith(`${menu.href}/`);

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={clsx(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                            )}
                        >
                            <Icon className="h-5 w-5" />

                            <span>{menu.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
