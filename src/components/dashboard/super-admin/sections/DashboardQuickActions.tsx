"use client";

import { FileText, Megaphone, ShieldAlert, Store, Users, Wallet } from "lucide-react";

import { ROLES } from "@/constants/roles";

import { QuickActionCard } from "../cards/QuickActionCard";
import type { DashboardRole, QuickActionItem } from "../../types";

interface DashboardQuickActionsProps {
    role: DashboardRole;
}

const quickActions: QuickActionItem[] = [
    {
        title: "Kelola Pengguna",
        description: "Tambah, ubah, dan atur hak akses pengguna.",
        href: "/dashboard/super-admin/users",
        icon: Users,
        color: "blue",
        roles: [ROLES.SUPER_ADMIN],
    },

    {
        title: "Administrasi Surat",
        description: "Proses layanan administrasi masyarakat.",
        href: "/dashboard/super-admin/service",
        icon: FileText,
        color: "emerald",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS],
    },

    {
        title: "Kelola UMKM",
        description: "Kelola data dan informasi usaha desa.",
        href: "/dashboard/super-admin/umkm",
        icon: Store,
        color: "amber",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },

    {
        title: "APBDes",
        description: "Kelola transparansi anggaran desa.",
        href: "/dashboard/super-admin/apbdes",
        icon: Wallet,
        color: "violet",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    },

    {
        title: "Berita & Informasi",
        description: "Publikasikan informasi terbaru desa.",
        href: "/dashboard/super-admin/content/news",
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
];

export function DashboardQuickActions({ role }: DashboardQuickActionsProps) {
    const actions = quickActions.filter((action) => action.roles.includes(role));

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">Aksi Cepat</h2>

                <p className="text-sm text-muted-foreground">
                    Akses fitur utama sesuai dengan hak akses Anda.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {actions.map((action) => (
                    <QuickActionCard key={action.href} {...action} />
                ))}
            </div>
        </section>
    );
}
