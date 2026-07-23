import {
    CalendarDays,
    ChartBar,
    FileText,
    Images,
    Landmark,
    LayoutDashboard,
    MapPin,
    MapPinned,
    Megaphone,
    MessageSquareWarning,
    Newspaper,
    Package,
    Settings,
    ShieldAlert,
    Store,
    UserCircle,
    Users,
    Wallet,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { ROLES, type UserRole } from "@/constants/roles";

export interface AdminNavigationItem {
    title: string;
    description?: string;
    href: string;
    icon: LucideIcon;
}

export const adminNavigation: Record<UserRole, AdminNavigationItem[]> = {
    [ROLES.SUPER_ADMIN]: [
        {
            title: "Dashboard",
            description: "Ringkasan informasi dan aktivitas desa.",
            href: "/dashboard/super-admin",
            icon: LayoutDashboard,
        },
        {
            title: "Pengguna",
            description: "Kelola akun dan hak akses pengguna.",
            href: "/dashboard/super-admin/users",
            icon: Users,
        },
        {
            title: "Layanan Surat",
            description: "Kelola pelayanan administrasi desa.",
            href: "/dashboard/super-admin/service",
            icon: FileText,
        },
        {
            title: "UMKM",
            description: "Kelola data usaha masyarakat.",
            href: "/dashboard/super-admin/umkm",
            icon: Store,
        },
        {
            title: "APBDes",
            description: "Kelola transparansi anggaran desa.",
            href: "/dashboard/super-admin/apbdes",
            icon: Wallet,
        },
        {
            title: "Berita",
            description: "Kelola publikasi berita desa.",
            href: "/dashboard/super-admin/content/news",
            icon: Newspaper,
        },
        {
            title: "Wisata",
            description: "Kelola destinasi wisata desa.",
            href: "/dashboard/super-admin/tourism",
            icon: MapPinned,
        },
        {
            title: "Galeri",
            description: "Kelola dokumentasi kegiatan desa.",
            href: "/dashboard/super-admin/gallery",
            icon: Images,
        },
        {
            title: "Agenda",
            description: "Kelola agenda kegiatan desa.",
            href: "/dashboard/super-admin/events",
            icon: CalendarDays,
        },
        {
            title: "Pengumuman",
            description: "Kelola informasi resmi desa.",
            href: "/dashboard/super-admin/announcements",
            icon: Megaphone,
        },
        {
            title: "Pengaduan",
            description: "Kelola laporan masyarakat.",
            href: "/dashboard/super-admin/complaints",
            icon: ShieldAlert,
        },
        {
            title: "Pemerintahan Desa",
            description: "Kelola struktur dan perangkat desa.",
            href: "/dashboard/super-admin/village-official",
            icon: Landmark,
        },
        {
            title: "Pengaturan",
            description: "Konfigurasi sistem aplikasi.",
            href: "/dashboard/super-admin/settings",
            icon: Settings,
        },
    ],

    [ROLES.ADMIN]: [
        {
            title: "Dashboard",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
        },

        {
            title: "Layanan Desa",
            href: "/dashboard/admin/services",
            icon: FileText,
        },

        {
            title: "Konten Desa",
            href: "/dashboard/admin/content",
            icon: Newspaper,
        },

        {
            title: "Berita Desa",
            href: "/dashboard/admin/news",
            icon: Newspaper,
        },

        {
            title: "Pengumuman",
            href: "/dashboard/admin/announcements",
            icon: Megaphone,
        },

        {
            title: "Agenda Desa",
            href: "/dashboard/admin/events",
            icon: CalendarDays,
        },

        {
            title: "Galeri Desa",
            href: "/dashboard/admin/gallery",
            icon: Images,
        },

        {
            title: "UMKM",
            href: "/dashboard/admin/umkm",
            icon: Store,
        },

        {
            title: "Wisata Desa",
            href: "/dashboard/admin/tourism",
            icon: MapPinned,
        },

        {
            title: "Pengaduan Warga",
            href: "/dashboard/admin/complaints",
            icon: MessageSquareWarning,
        },

        {
            title: "Pengaturan",
            href: "/dashboard/admin/settings",
            icon: Settings,
        },
    ],

    [ROLES.PETUGAS]: [
        {
            title: "Dashboard",
            description: "Ringkasan tugas pelayanan.",
            href: "/dashboard/petugas",
            icon: LayoutDashboard,
        },

        {
            title: "Layanan Surat",
            description: "Proses permohonan administrasi warga.",
            href: "/dashboard/petugas/services",
            icon: FileText,
        },

        {
            title: "Pengaduan Warga",
            description: "Tindak lanjut laporan warga.",
            href: "/dashboard/petugas/complaints",
            icon: ShieldAlert,
        },

        {
            title: "Data Warga",
            description: "Melihat data warga untuk kebutuhan pelayanan.",
            href: "/dashboard/petugas/residents",
            icon: Users,
        },

        {
            title: "Agenda Desa",
            description: "Melihat kegiatan dan agenda desa.",
            href: "/dashboard/petugas/events",
            icon: CalendarDays,
        },

        {
            title: "Profil Akun",
            description: "Kelola informasi akun petugas.",
            href: "/dashboard/petugas/profile",
            icon: UserCircle,
        },
    ],

    [ROLES.UMKM]: [
        {
            title: "Dashboard",
            description: "Ringkasan perkembangan usaha Anda.",
            href: "/dashboard/umkm",
            icon: LayoutDashboard,
        },

        {
            title: "Profil Usaha",
            description: "Kelola informasi usaha dan identitas bisnis.",
            href: "/dashboard/umkm/profile",
            icon: Store,
        },

        {
            title: "Produk",
            description: "Kelola daftar produk atau layanan usaha.",
            href: "/dashboard/umkm/products",
            icon: Package,
        },

        {
            title: "Galeri Usaha",
            description: "Kelola foto produk dan dokumentasi usaha.",
            href: "/dashboard/umkm/gallery",
            icon: Images,
        },

        {
            title: "Informasi Kontak",
            description: "Atur kontak dan lokasi usaha.",
            href: "/dashboard/umkm/contact",
            icon: MapPin,
        },

        {
            title: "Statistik",
            description: "Melihat performa usaha Anda.",
            href: "/dashboard/umkm/statistics",
            icon: ChartBar,
        },

        {
            title: "Pengaturan Akun",
            description: "Kelola akun UMKM.",
            href: "/dashboard/umkm/settings",
            icon: Settings,
        },
    ],
};
