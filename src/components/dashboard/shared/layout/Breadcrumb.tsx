"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import { ROLES, UserRole } from "@/constants/roles";
import { getNavigation } from "@/lib/navigation";

import type { LucideIcon } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface BreadcrumbProps {
    role: UserRole;
}

export function Breadcrumb({ role }: BreadcrumbProps) {
    const pathname = usePathname();

    const items = getNavigation(role);

    const current = Array.isArray(items)
        ? items
              .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
              .sort((a, b) => a.href.length - b.href.length)
        : [];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard/super-admin",
            icon: Home,
        },
        ...current
            .filter((item) => item.href !== "/dashboard/super-admin")
            .map((item) => ({
                label: item.breadcrumb ?? item.title,
                href: item.href,
                icon: item.icon,
            })),
    ];

    return (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
            {breadcrumbs.map((item, index) => {
                const last = index === breadcrumbs.length - 1;
                const Icon = item.icon;

                return (
                    <div key={item.href} className="flex min-w-0 items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />

                        {last ? (
                            <span className="truncate font-medium text-foreground">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="truncate text-muted-foreground transition hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        )}

                        {!last && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                );
            })}
        </nav>
    );
}
