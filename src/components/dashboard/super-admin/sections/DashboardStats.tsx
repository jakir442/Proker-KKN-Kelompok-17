"use client";

import { FileText, Store, Users, Wallet } from "lucide-react";

import { StatCard } from "../cards/StatCard";
import { StatCardProps } from "../../types";

const stats: StatCardProps[] = [
    {
        title: "Pengguna",
        value: 125,
        description: "Total pengguna terdaftar",
        icon: Users,
        trend: "+12%",
        trendLabel: "bulan ini",
        color: "blue",
        href: "/dashboard/users",
    },
    {
        title: "APBDes",
        value: "Rp250 Juta",
        description: "Total anggaran desa",
        icon: Wallet,
        color: "emerald",
        href: "/dashboard/apbdes",
    },
    {
        title: "Surat",
        value: 89,
        description: "Surat yang sedang diproses",
        icon: FileText,
        trend: "+8",
        trendLabel: "hari ini",
        color: "amber",
        href: "/dashboard/letters",
    },
    {
        title: "UMKM",
        value: 34,
        description: "UMKM terdaftar",
        icon: Store,
        trend: "+5",
        trendLabel: "minggu ini",
        color: "violet",
        href: "/dashboard/umkm",
    },
];

export function DashboardStats() {
    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">Ringkasan Statistik</h2>

                <p className="text-sm text-muted-foreground">
                    Gambaran umum data dan aktivitas Smart Village Cintanagara.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>
        </section>
    );
}
