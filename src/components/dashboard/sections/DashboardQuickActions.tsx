"use client";

import {
    Building2,
    CalendarDays,
    FileText,
    Images,
    Landmark,
    MapPinned,
    Megaphone,
    Newspaper,
    ShieldAlert,
    Store,
    Users,
    Wallet,
} from "lucide-react";

import { ROLES } from "@/constants/roles";

import { QuickActionCard } from "../cards/QuickActionCard";
import { DashboardRole, QuickActionItem } from "../types";

interface DashboardQuickActionsProps {
    role: DashboardRole;
}

const quickActions: QuickActionItem[] = [
    {
        title: "Kelola Pengguna",
        description: "Tambah, ubah, dan kelola akun pengguna.",
        href: "/dashboard/super-admin/users",
        icon: Users,
        color: "blue",
        roles: [ROLES.SUPER_ADMIN],
    },
    {
        title: "Administrasi Surat",
        description: "Proses permohonan surat masyarakat.",
        href: "/dashboard/super-admin/letters",
        icon: FileText,
        color: "emerald",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS],
    },
    {
        title: "UMKM",
        description: "Kelola data UMKM desa.",
        href: "/dashboard/super-admin/umkm",
        icon: Store,
        color: "amber",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "APBDes",
        description: "Transparansi anggaran desa.",
        href: "/dashboard/super-admin/apbdes",
        icon: Wallet,
        color: "emerald",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Berita",
        description: "Publikasi berita desa.",
        href: "/dashboard/super-admin/content/news",
        icon: Newspaper,
        color: "blue",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Wisata",
        description: "Kelola destinasi wisata desa.",
        href: "/dashboard/super-admin/tourism",
        icon: MapPinned,
        color: "violet",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Galeri",
        description: "Dokumentasi kegiatan desa.",
        href: "/dashboard/super-admin/gallery",
        icon: Images,
        color: "rose",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Agenda",
        description: "Kelola agenda kegiatan desa.",
        href: "/dashboard/super-admin/events",
        icon: CalendarDays,
        color: "amber",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Pengumuman",
        description: "Publikasikan informasi resmi desa.",
        href: "/dashboard/super-admin/announcements",
        icon: Megaphone,
        color: "blue",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },
    {
        title: "Pengaduan",
        description: "Tindak lanjuti laporan masyarakat.",
        href: "/dashboard/super-admin/complaints",
        icon: ShieldAlert,
        color: "rose",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS],
    },
    {
        title: "Profil Desa",
        description: "Kelola informasi profil desa.",
        href: "/dashboard/super-admin/village-profile",
        icon: Building2,
        color: "emerald",
        roles: [ROLES.SUPER_ADMIN],
    },
    {
        title: "Pejabat Desa",
        description: "Kelola data aparatur desa.",
        href: "/dashboard/super-admin/village-official",
        icon: Landmark,
        color: "violet",
        roles: [ROLES.SUPER_ADMIN],
    },
];

export function DashboardQuickActions({ role }: DashboardQuickActionsProps) {
    const actions = quickActions.filter((action) => action.roles.includes(role));

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">Aksi Cepat</h2>

                <p className="text-sm text-muted-foreground">
                    Akses cepat ke fitur yang tersedia sesuai hak akses Anda.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {actions.map((action) => (
                    <QuickActionCard key={action.href} {...action} />
                ))}
            </div>
        </section>
    );
}
