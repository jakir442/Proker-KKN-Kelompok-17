"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { ROLES, type UserRole } from "@/constants/roles";
import { adminNavigation } from "@/config/navigation-admin";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const menus = Array.isArray(adminNavigation[role]) ? adminNavigation[role] : [];

    const roleLabel =
        role === ROLES.SUPER_ADMIN ? "SUPER ADMIN" : role.replace("_", " ").toUpperCase();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background/95 backdrop-blur md:flex">
            <div className="flex items-center gap-3 border-b px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
                    C
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-sm font-semibold tracking-tight">Cintanagara</h1>

                    <p className="truncate text-xs text-muted-foreground">Smart Village</p>
                </div>
            </div>

            <div className="px-4 pt-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />

                    {roleLabel}
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-1">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        const active =
                            pathname === menu.href || pathname.startsWith(`${menu.href}/`);

                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                    active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
                                )}

                                <Icon
                                    className={cn(
                                        "h-4.5 w-4.5 shrink-0 transition-transform",
                                        active && "scale-110",
                                    )}
                                />

                                <span className="truncate">{menu.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="border-t px-4 py-3 text-xs text-muted-foreground">
                Pemerintah Desa Cintanagara
            </div>
        </aside>
    );
}
