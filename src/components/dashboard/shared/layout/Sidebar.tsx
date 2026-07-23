"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { adminNavigation } from "@/config/navigation-admin";
import { ROLES, type UserRole } from "@/constants/roles";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: UserRole;
    userName?: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
    const pathname = usePathname();

    const menus = adminNavigation[role] ?? [];

    const roleLabel =
        role === ROLES.SUPER_ADMIN
            ? "SUPER ADMIN"
            : role === ROLES.ADMIN
              ? "ADMIN DESA"
              : role === ROLES.PETUGAS
                ? "PETUGAS DESA"
                : "UMKM";

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background/95 backdrop-blur md:flex">
            {/* Branding */}
            <div className="flex items-center gap-3 border-b px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
                    C
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-sm font-semibold">Cintanagara</h1>

                    <p className="truncate text-xs text-muted-foreground">Smart Village</p>
                </div>
            </div>

            {/* Role */}
            <div className="px-4 pt-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />

                    {roleLabel}
                </div>
            </div>

            {/* Menu */}
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
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                    active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
                                )}

                                <Icon className={cn("h-4 w-4 shrink-0", active && "scale-110")} />

                                <span className="truncate">{menu.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Account */}
            <div className="border-t px-4 py-4">
                <p className="truncate text-sm font-medium">{userName ?? "User"}</p>

                <p className="text-xs text-muted-foreground">{roleLabel}</p>
            </div>
        </aside>
    );
}
