"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menus = [
    { name: "Home", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Berita", href: "/berita" },
    { name: "UMKM", href: "/umkm" },
    { name: "Wisata", href: "/wisata" },
    { name: "Galeri", href: "/galeri" },
    // { name: "Kontak", href: "/kontak" },
    { name: "Layanan", href: "/layanan" },
    { name: "Kontak", href: "/kontak" },
    { name: "Pengumuman", href: "/pengumuman" },
    { name: "Agenda", href: "/agenda" },
    { name: "Transparansi", href: "/transparansi" },
    { name: "Aspirasi", href: "/aspirasi" },
];

export function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="right">
                <div className="mt-10 flex flex-col gap-5">
                    {menus.map((menu) => (
                        <Link key={menu.href} href={menu.href}>
                            {menu.name}
                        </Link>
                    ))}

                    <Link href="/login" className="font-semibold text-emerald-600">
                        Login Admin
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}
