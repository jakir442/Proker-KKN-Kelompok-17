"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { ROLES } from "@/constants/roles";
import { getNavigation } from "@/lib/navigation";

export function Breadcrumb() {
    const pathname = usePathname();

    // sementara gunakan role Super Admin
    // nanti akan diganti dari session
    const items = getNavigation(ROLES.SUPER_ADMIN);

    const current = items.find((item) => item.href === pathname);

    const breadcrumbs = [
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
        <nav className="flex items-center text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}

                    <Link href={item.href} className="hover:text-foreground">
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
