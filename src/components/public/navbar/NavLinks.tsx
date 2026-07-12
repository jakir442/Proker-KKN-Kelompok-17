"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menus = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Profil",
        href: "/profil",
    },
    {
        name: "Berita",
        href: "/berita",
    },
    {
        name: "UMKM",
        href: "/umkm",
    },
    {
        name: "Wisata",
        href: "/wisata",
    },
    {
        name: "Galeri",
        href: "/galeri",
    },
    {
        name: "Kontak",
        href: "/kontak",
    },
];

export function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {menus.map((menu) => (
                <Link
                    key={menu.href}
                    href={menu.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-emerald-600",
                        pathname === menu.href ? "text-emerald-600" : "text-slate-700",
                    )}
                >
                    {menu.name}
                </Link>
            ))}
        </>
    );
}
