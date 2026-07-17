import {
    LayoutDashboard,
    Users,
    Wallet,
    Droplets,
    FileText,
    Store,
    Bot,
    Settings,
} from "lucide-react";

import { ROLES } from "@/constants/roles";

export interface NavigationItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    breadcrumb?: string;
}

export const navigation: Record<string, NavigationItem[]> = {
    [ROLES.SUPER_ADMIN]: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Pengguna",
            href: "/dashboard/users",
            icon: Users,
        },
        {
            title: "APBDes",
            href: "/dashboard/apbdes",
            icon: Wallet,
        },
        {
            title: "Air Bersih",
            href: "/dashboard/water",
            icon: Droplets,
        },
        {
            title: "Administrasi Surat",
            breadcrumb: "Surat",
            href: "/dashboard/letters",
            icon: FileText,
        },
        {
            title: "UMKM",
            href: "/dashboard/umkm",
            icon: Store,
        },
        {
            title: "Asisten AI",
            href: "/dashboard/ai",
            icon: Bot,
        },
        {
            title: "Pengaturan",
            href: "/dashboard/settings",
            icon: Settings,
        },
        {
            title: "Berita",
            href: "/dashboard/content/news",
            icon: FileText,
        },
        {
            title: "Wisata",
            href: "/dashboard/tourism",
            icon: FileText,
        },
        {
            title: "Layanan",
            href: "/dashboard/service",
            icon: FileText,
        },
        {
            title: "Gallery",
            href: "/dashboard/gallery",
            icon: FileText,
        },
        {
            title: "Pengumuman",
            href: "/dashboard/announcements",
            icon: FileText,
        },
        {
            title: "Agenda",
            href: "/dashboard/events",
            icon: FileText,
        },
        {
            title: "APBDes",
            href: "/dashboard/apbdes",
            icon: FileText,
        },
        {
            title: "Keluhan",
            href: "/dashboard/complaints",
            icon: FileText,
        },
    ],
};
