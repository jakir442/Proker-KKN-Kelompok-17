import {
    Building2,
    CalendarDays,
    ChartBar,
    FileText,
    Globe,
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
    ShieldCheck,
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
    breadcrumb?: string;
    parent?: string;
}

export const adminNavigation: Record<UserRole, AdminNavigationItem[]> = {
    [ROLES.SUPER_ADMIN]: [
        {
            title: "Dashboard",
            breadcrumb: "Dashboard",
            description: "Ringkasan informasi dan aktivitas desa.",
            href: "/dashboard/super-admin",
            icon: LayoutDashboard,
        },
        {
            title: "Pengguna",
            breadcrumb: "Pengguna",
            description: "Kelola akun dan hak akses pengguna.",
            href: "/dashboard/super-admin/users",
            icon: Users,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Layanan Surat",
            breadcrumb: "Layanan Surat",
            description: "Kelola pelayanan administrasi desa.",
            href: "/dashboard/super-admin/service",
            icon: FileText,
            parent: "/dashboard/super-admin",
        },
        {
            title: "UMKM",
            breadcrumb: "UMKM",
            description: "Kelola data usaha masyarakat.",
            href: "/dashboard/super-admin/umkm",
            icon: Store,
            parent: "/dashboard/super-admin",
        },
        {
            title: "APBDes",
            breadcrumb: "APBDes",
            description: "Kelola transparansi anggaran desa.",
            href: "/dashboard/super-admin/apbdes",
            icon: Wallet,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Berita",
            breadcrumb: "Berita",
            description: "Kelola publikasi berita desa.",
            href: "/dashboard/super-admin/content/news",
            icon: Newspaper,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Wisata",
            breadcrumb: "Wisata",
            description: "Kelola destinasi wisata desa.",
            href: "/dashboard/super-admin/tourism",
            icon: MapPinned,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Galeri",
            breadcrumb: "Galeri",
            description: "Kelola dokumentasi kegiatan desa.",
            href: "/dashboard/super-admin/gallery",
            icon: Images,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Agenda",
            breadcrumb: "Agenda",
            description: "Kelola agenda kegiatan desa.",
            href: "/dashboard/super-admin/events",
            icon: CalendarDays,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Pengumuman",
            breadcrumb: "Pengumuman",
            description: "Kelola informasi resmi desa.",
            href: "/dashboard/super-admin/announcements",
            icon: Megaphone,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Pengaduan",
            breadcrumb: "Pengaduan",
            description: "Kelola laporan masyarakat.",
            href: "/dashboard/super-admin/complaints",
            icon: ShieldAlert,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Pemerintahan Desa",
            breadcrumb: "Pemerintahan Desa",
            description: "Kelola struktur dan perangkat desa.",
            href: "/dashboard/super-admin/village-official",
            icon: Landmark,
            parent: "/dashboard/super-admin",
        },
        {
            title: "Pengaturan",
            breadcrumb: "Pengaturan",
            description: "Konfigurasi sistem aplikasi.",
            href: "/dashboard/super-admin/settings",
            icon: Settings,
            parent: "/dashboard/super-admin",
        },

        // submenu settings
        {
            title: "Profil Desa",
            breadcrumb: "Profil Desa",
            href: "/dashboard/super-admin/settings/village-profile",
            icon: Landmark,
            parent: "/dashboard/super-admin/settings",
        },
        {
            title: "Website",
            breadcrumb: "Website",
            href: "/dashboard/super-admin/settings/website",
            icon: Settings,
            parent: "/dashboard/super-admin/settings",
        },
        {
            title: "Keamanan",
            breadcrumb: "Keamanan",
            href: "/dashboard/super-admin/settings/security",
            icon: Settings,
            parent: "/dashboard/super-admin/settings",
        },
    ],

    [ROLES.ADMIN]: [
        {
            title: "Dashboard",
            breadcrumb: "Dashboard",
            description: "Ringkasan aktivitas administrasi desa.",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
        },

        {
            title: "Pengguna",
            breadcrumb: "Pengguna",
            description: "Kelola administrator, petugas, dan akun UMKM.",
            href: "/dashboard/admin/users",
            icon: Users,
            parent: "/dashboard/admin",
        },

        {
            title: "Layanan Desa",
            breadcrumb: "Layanan Desa",
            description: "Kelola layanan administrasi desa.",
            href: "/dashboard/admin/services",
            icon: FileText,
            parent: "/dashboard/admin",
        },

        {
            title: "Berita Desa",
            breadcrumb: "Berita",
            description: "Kelola berita desa.",
            href: "/dashboard/admin/news",
            icon: Newspaper,
            parent: "/dashboard/admin",
        },

        {
            title: "Pengumuman",
            breadcrumb: "Pengumuman",
            description: "Kelola pengumuman desa.",
            href: "/dashboard/admin/announcements",
            icon: Megaphone,
            parent: "/dashboard/admin",
        },

        {
            title: "Agenda Desa",
            breadcrumb: "Agenda",
            description: "Kelola agenda kegiatan desa.",
            href: "/dashboard/admin/events",
            icon: CalendarDays,
            parent: "/dashboard/admin",
        },

        {
            title: "Galeri Desa",
            breadcrumb: "Galeri",
            description: "Kelola dokumentasi kegiatan desa.",
            href: "/dashboard/admin/gallery",
            icon: Images,
            parent: "/dashboard/admin",
        },

        {
            title: "UMKM",
            breadcrumb: "UMKM",
            description: "Kelola data UMKM desa.",
            href: "/dashboard/admin/umkm",
            icon: Store,
            parent: "/dashboard/admin",
        },

        {
            title: "Wisata Desa",
            breadcrumb: "Wisata",
            description: "Kelola destinasi wisata desa.",
            href: "/dashboard/admin/tourism",
            icon: MapPinned,
            parent: "/dashboard/admin",
        },

        {
            title: "APBDes",
            breadcrumb: "APBDes",
            description: "Kelola transparansi APBDes desa.",
            href: "/dashboard/admin/apbdes",
            icon: Wallet,
            parent: "/dashboard/admin",
        },

        {
            title: "Pemerintahan Desa",
            breadcrumb: "Pemerintahan",
            description: "Kelola perangkat dan struktur pemerintahan desa.",
            href: "/dashboard/admin/government",
            icon: Landmark,
            parent: "/dashboard/admin",
        },

        {
            title: "Pengaduan Warga",
            breadcrumb: "Pengaduan",
            description: "Kelola laporan dan pengaduan masyarakat.",
            href: "/dashboard/admin/complaints",
            icon: MessageSquareWarning,
            parent: "/dashboard/admin",
        },

        {
            title: "Pengaturan",
            breadcrumb: "Pengaturan",
            description: "Konfigurasi website dan aplikasi desa.",
            href: "/dashboard/admin/settings",
            icon: Settings,
            parent: "/dashboard/admin",
        },

        // ===== Submenu Pengaturan =====

        {
            title: "Profil Desa",
            breadcrumb: "Profil Desa",
            description: "Kelola informasi profil Desa Cintanagara.",
            href: "/dashboard/admin/settings/village-profile",
            icon: Building2,
            parent: "/dashboard/admin/settings",
        },

        {
            title: "Website",
            breadcrumb: "Website",
            description: "Kelola identitas dan tampilan website.",
            href: "/dashboard/admin/settings/website",
            icon: Globe,
            parent: "/dashboard/admin/settings",
        },

        {
            title: "Keamanan",
            breadcrumb: "Keamanan",
            description: "Kelola keamanan dan autentikasi sistem.",
            href: "/dashboard/admin/settings/security",
            icon: ShieldCheck,
            parent: "/dashboard/admin/settings",
        },
    ],

    [ROLES.PETUGAS]: [
        {
            title: "Dashboard",
            breadcrumb: "Dashboard",
            description: "Ringkasan tugas pelayanan.",
            href: "/dashboard/petugas",
            icon: LayoutDashboard,
        },

        {
            title: "Layanan Surat",
            breadcrumb: "Layanan Surat",
            description: "Proses permohonan administrasi warga.",
            href: "/dashboard/petugas/services",
            icon: FileText,
            parent: "/dashboard/petugas",
        },

        {
            title: "Pengaduan Warga",
            breadcrumb: "Pengaduan",
            description: "Tindak lanjut laporan warga.",
            href: "/dashboard/petugas/complaints",
            icon: ShieldAlert,
            parent: "/dashboard/petugas",
        },

        {
            title: "Data Warga",
            breadcrumb: "Data Warga",
            description: "Melihat data warga untuk kebutuhan pelayanan.",
            href: "/dashboard/petugas/residents",
            icon: Users,
            parent: "/dashboard/petugas",
        },

        {
            title: "Agenda Desa",
            breadcrumb: "Agenda",
            description: "Melihat kegiatan dan agenda desa.",
            href: "/dashboard/petugas/events",
            icon: CalendarDays,
            parent: "/dashboard/petugas",
        },

        {
            title: "Profil Akun",
            breadcrumb: "Profil Akun",
            description: "Kelola informasi akun petugas.",
            href: "/dashboard/petugas/profile",
            icon: UserCircle,
            parent: "/dashboard/petugas",
        },
    ],

    [ROLES.UMKM]: [
        {
            title: "Dashboard",
            breadcrumb: "Dashboard",
            description: "Ringkasan perkembangan usaha Anda.",
            href: "/dashboard/umkm",
            icon: LayoutDashboard,
        },

        {
            title: "Profil Usaha",
            breadcrumb: "Profil Usaha",
            description: "Kelola informasi usaha dan identitas bisnis.",
            href: "/dashboard/umkm/profile",
            icon: Store,
            parent: "/dashboard/umkm",
        },

        {
            title: "Produk",
            breadcrumb: "Produk",
            description: "Kelola daftar produk atau layanan usaha.",
            href: "/dashboard/umkm/products",
            icon: Package,
            parent: "/dashboard/umkm",
        },

        {
            title: "Galeri Usaha",
            breadcrumb: "Galeri",
            description: "Kelola foto produk dan dokumentasi usaha.",
            href: "/dashboard/umkm/gallery",
            icon: Images,
            parent: "/dashboard/umkm",
        },

        {
            title: "Informasi Kontak",
            breadcrumb: "Informasi Kontak",
            description: "Atur kontak dan lokasi usaha.",
            href: "/dashboard/umkm/contact",
            icon: MapPin,
            parent: "/dashboard/umkm",
        },

        {
            title: "Statistik",
            breadcrumb: "Statistik",
            description: "Melihat performa usaha Anda.",
            href: "/dashboard/umkm/statistics",
            icon: ChartBar,
            parent: "/dashboard/umkm",
        },

        {
            title: "Pengaturan Akun",
            breadcrumb: "Pengaturan",
            description: "Kelola akun UMKM.",
            href: "/dashboard/umkm/settings",
            icon: Settings,
            parent: "/dashboard/umkm",
        },

        // Submenu Pengaturan
        {
            title: "Profil Akun",
            breadcrumb: "Profil Akun",
            href: "/dashboard/umkm/settings/profile",
            icon: UserCircle,
            parent: "/dashboard/umkm/settings",
        },

        {
            title: "Keamanan",
            breadcrumb: "Keamanan",
            href: "/dashboard/umkm/settings/security",
            icon: Settings,
            parent: "/dashboard/umkm/settings",
        },
    ],
};
