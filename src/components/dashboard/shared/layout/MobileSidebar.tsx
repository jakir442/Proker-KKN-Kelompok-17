"use client";

import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/navigation-admin";
import { ROLES, type UserRole } from "@/constants/roles";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
    role: UserRole;
    userName?: string;
    open: boolean;
    onClose: () => void;
}

export function MobileSidebar({
    role,
    userName,
    open,
    onClose,
}: MobileSidebarProps) {
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
        <>
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 md:hidden",
                    open
                        ? "translate-x-0"
                        : "-translate-x-full",
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <h1 className="text-sm font-semibold">
                            Cintanagara
                        </h1>

                        <p className="text-xs text-muted-foreground">
                            Smart Village
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                {/* Role */}
                <div className="px-4 py-4">
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-3 text-xs font-semibold text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />

                        {roleLabel}
                    </div>
                </div>


                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3">
                    <div className="space-y-1">
                        {menus.map((menu) => {
                            const Icon = menu.icon;

                            const active =
                                pathname === menu.href ||
                                pathname.startsWith(
                                    `${menu.href}/`,
                                );

                            return (
                                <Link
                                    key={menu.href}
                                    href={menu.href}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                                        active
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    )}
                                >
                                    <Icon className="h-5 w-5" />

                                    <span>
                                        {menu.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>


                {/* Account */}
                <div className="border-t px-4 py-4">
                    <p className="truncate text-sm font-medium">
                        {userName ?? "User"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {roleLabel}
                    </p>
                </div>
            </aside>
        </>
    );
}