"use client";

import { Building2, Home, Landmark, Map, Sparkles, Trees, Users } from "lucide-react";

import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    area: number;
    population: number;
    households: number;
    rt: number;
    rw: number;
    hamlets: number;
}

export function VillageStats({ area, population, households, rt, rw, hamlets }: Props) {
    const stats = [
        {
            title: "Luas Wilayah",
            value: `${area} Ha`,
            icon: Map,
        },
        {
            title: "Kepala Keluarga",
            value: households.toLocaleString("id-ID"),
            icon: Home,
        },
        {
            title: "RT",
            value: rt,
            icon: Building2,
        },
        {
            title: "RW",
            value: rw,
            icon: Landmark,
        },
        {
            title: "Dusun",
            value: hamlets,
            icon: Trees,
        },
    ];

    return (
        <section className="relative">
            <SectionHeading
                badge="Statistik Desa"
                title="Data Singkat"
                highlight="Desa Cintanagara"
                description="Statistik umum Desa Cintanagara sebagai gambaran kondisi wilayah, kependudukan, serta pembagian administrasi desa."
                number="05"
                icon={Sparkles}
            />
            <div className="mt-10 space-y-8">
                {/* ================= HERO CARD ================= */}
                <div className="relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-cyan-500/10 via-background to-background p-10 shadow-sm transition-all duration-300 hover:shadow-xl">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
                            <Users className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <p className="mt-8 text-6xl font-black tracking-tight text-foreground">
                            {population.toLocaleString("id-ID")}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold">Jumlah Penduduk</h3>
                        <p className="mt-4 max-w-xl leading-8 text-muted-foreground">
                            Total penduduk yang berdomisili di Desa Cintanagara berdasarkan data
                            administrasi desa terbaru.
                        </p>
                    </div>
                </div>

                {/* ================= GRID ================= */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    bg-card
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-cyan-500/30
                                    hover:shadow-xl
                                "
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl" />
                                <div className="relative">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 transition-colors duration-300 group-hover:bg-cyan-500">
                                        <Icon className="h-7 w-7 text-cyan-600 transition-colors group-hover:text-white dark:text-cyan-400" />
                                    </div>
                                    <p className="mt-6 text-sm text-muted-foreground">
                                        {item.title}
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                                        {item.value}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ================= INFO ================= */}
                <div className="rounded-[2rem] border bg-muted/40 p-8">
                    <p className="mx-auto max-w-3xl text-center leading-8 text-muted-foreground">
                        Data statistik di atas merupakan gambaran umum mengenai kondisi wilayah dan
                        kependudukan Desa Cintanagara yang menjadi dasar dalam penyusunan kebijakan,
                        pelayanan publik, serta perencanaan pembangunan desa secara berkelanjutan.
                    </p>
                </div>
            </div>
        </section>
    );
}
