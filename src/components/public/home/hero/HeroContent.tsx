"use client";

import Link from "next/link";
import { ArrowRight, Info, ShieldCheck, Store, Trees, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations";

const highlights = [
    {
        icon: ShieldCheck,
        label: "Pelayanan Digital",
    },
    {
        icon: Landmark,
        label: "Transparansi APBDes",
    },
    {
        icon: Store,
        label: "UMKM Lokal",
    },
    {
        icon: Trees,
        label: "Wisata Desa",
    },
];

export function HeroContent() {
    return (
        <div className="max-w-3xl space-y-8">
            {/* Badge */}
            <FadeUp>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-xl">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>

                    <span className="text-sm font-medium tracking-wide text-white/90">
                        Website Resmi • Smart Village Cintanagara
                    </span>
                </div>
            </FadeUp>

            {/* Heading */}
            <FadeUp delay={0.1}>
                <h1 className="max-w-3xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    Membangun Desa Digital
                    <br />
                    yang <span className="text-emerald-400">Modern</span>,
                    <br />
                    <span className="text-emerald-400">Transparan</span>,
                    <br />
                    dan <span className="text-emerald-400">Melayani.</span>
                </h1>
            </FadeUp>

            {/* Description */}
            <FadeUp delay={0.2}>
                <p className="max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                    Portal digital resmi Desa Cintanagara yang menghadirkan informasi desa,
                    transparansi APBDes, pelayanan administrasi, berita, UMKM lokal, wisata, serta
                    berbagai layanan publik dalam satu platform.
                </p>
            </FadeUp>

            {/* Actions */}
            <FadeUp delay={0.3}>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="group h-12 rounded-full bg-emerald-600 px-8 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500"
                    >
                        <Link
                            href="/profil"
                            className="inline-flex items-center justify-center whitespace-nowrap"
                        >
                            Jelajahi Desa
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 rounded-full border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white hover:text-slate-900"
                    >
                        <Link
                            href="/berita"
                            className="inline-flex items-center justify-center whitespace-nowrap"
                        >
                            <Info className="mr-2 h-4 w-4" />
                            Berita Desa
                        </Link>
                    </Button>
                </div>
            </FadeUp>

            {/* Highlights */}
            <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-3">
                    {highlights.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                        >
                            <Icon className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </FadeUp>
        </div>
    );
}
