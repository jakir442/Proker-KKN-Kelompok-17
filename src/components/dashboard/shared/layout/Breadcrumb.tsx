"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import { ROLES } from "@/constants/roles";
import { getNavigation } from "@/lib/navigation";

interface BreadcrumbItem {
    label: string;
    href: string;
}

export function Breadcrumb() {
    const pathname = usePathname();
    const items = getNavigation(ROLES.SUPER_ADMIN);

    const current = Array.isArray(items)
        ? items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
        : undefined;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
    ];

    if (pathname !== "/dashboard" && current) {
        breadcrumbs.push({
            label: current.breadcrumb ?? current.title,
            href: current.href,
        });
    }

    return (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
            {breadcrumbs.map((item, index) => {
                const last = index === breadcrumbs.length - 1;

                return (
                    <div key={item.href} className="flex min-w-0 items-center gap-2">
                        {index === 0 && <Home className="h-4 w-4 text-muted-foreground" />}

                        {last ? (
                            <span
                                aria-current="page"
                                className="truncate font-medium text-foreground"
                            >
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
