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
            href: "/dashboard/super-admin/users",
            icon: Users,
        },
        {
            title: "APBDes",
            href: "/dashboard/super-admin/apbdes",
            icon: Wallet,
        },
        {
            title: "Air Bersih",
            href: "/dashboard/super-admin/water",
            icon: Droplets,
        },
        {
            title: "Administrasi Surat",
            breadcrumb: "Surat",
            href: "/dashboard/super-admin/letters",
            icon: FileText,
        },
        {
            title: "UMKM",
            href: "/dashboard/super-admin/umkm",
            icon: Store,
        },
        {
            title: "Asisten AI",
            href: "/dashboard/super-admin/ai",
            icon: Bot,
        },
        {
            title: "Pengaturan",
            href: "/dashboard/super-admin/settings",
            icon: Settings,
        },
        {
            title: "Berita",
            href: "/dashboard/super-admin/content/news",
            icon: FileText,
        },
        {
            title: "Wisata",
            href: "/dashboard/super-admin/tourism",
            icon: FileText,
        },
        {
            title: "Layanan",
            href: "/dashboard/super-admin/service",
            icon: FileText,
        },
        {
            title: "Gallery",
            href: "/dashboard/super-admin/gallery",
            icon: FileText,
        },
        {
            title: "Pengumuman",
            href: "/dashboard/super-admin/announcements",
            icon: FileText,
        },
        {
            title: "Agenda",
            href: "/dashboard/super-admin/events",
            icon: FileText,
        },
        {
            title: "APBDes",
            href: "/dashboard/super-admin/apbdes",
            icon: FileText,
        },
        {
            title: "Keluhan",
            href: "/dashboard/super-admin/complaints",
            icon: FileText,
        },
        {
            title: "Profile Desa",
            href: "/dashboard/super-admin/village-profile",
            icon: FileText,
        },
        {
            title: "Pejabat Desa",
            href: "/dashboard/super-admin/village-official",
            icon: FileText,
        },
    ],
};
