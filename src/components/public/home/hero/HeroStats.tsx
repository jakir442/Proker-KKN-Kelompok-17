"use client";

import { motion } from "framer-motion";
import { FileText, LucideIcon, MapPinned, Newspaper, Store } from "lucide-react";

import { FadeUp } from "@/components/animations";
import { HeroStatistics } from "@/repositories/hero.repository";
import { cn } from "@/lib/utils";

interface StatItem {
    icon: LucideIcon;
    value: number;
    label: string;
    color: string;
}

interface HeroStatsProps {
    stats: HeroStatistics;
}

export function HeroStats({ stats }: HeroStatsProps) {
    const items: StatItem[] = [
        {
            icon: Store,
            value: stats.totalUmkm,
            label: "UMKM",
            color: "text-emerald-400",
        },
        {
            icon: MapPinned,
            value: stats.totalTourism,
            label: "Destinasi",
            color: "text-amber-400",
        },
        {
            icon: Newspaper,
            value: stats.totalNews,
            label: "Berita",
            color: "text-sky-400",
        },
        {
            icon: FileText,
            value: stats.totalServices,
            label: "Layanan",
            color: "text-violet-400",
        },
    ];

    return (
        <div className="mt-20">
            {/* Header */}
            <FadeUp delay={0.35}>
                <div className="mb-8 flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400">
                        Statistik Desa
                    </span>

                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Data Singkat Desa Cintanagara
                    </h2>

                    <p className="max-w-2xl text-sm leading-6 text-slate-300">
                        Informasi yang ditampilkan berasal dari data yang telah dikelola oleh
                        Pemerintah Desa melalui dashboard Smart Village.
                    </p>
                </div>
            </FadeUp>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <FadeUp key={item.label} delay={0.45 + index * 0.08}>
                            <motion.div
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-800/70">
                                    <Icon
                                        className={cn(
                                            "h-7 w-7 transition-transform duration-300 group-hover:scale-110",
                                            item.color,
                                        )}
                                    />
                                </div>

                                {/* Value */}
                                <h3 className="relative text-3xl font-black tracking-tight text-white drop-shadow-sm">
                                    {item.value.toLocaleString("id-ID")}
                                </h3>

                                {/* Label */}
                                <p className="mt-2 text-sm font-medium text-slate-200">
                                    {item.label}
                                </p>

                                {/* Description */}
                                <p className="mt-1 text-xs leading-5 text-slate-400">
                                    Data terbaru yang tersedia pada sistem.
                                </p>

                                {/* Accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-emerald-400 transition-all duration-500 group-hover:w-full" />
                            </motion.div>
                        </FadeUp>
                    );
                })}
            </div>
        </div>
    );
}
