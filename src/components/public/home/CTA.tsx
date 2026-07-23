"use client";

import Link from "next/link";
import { ArrowRight, FileText, Landmark, MessageSquare, Sparkles } from "lucide-react";

import { BlurBlob, FadeUp, Reveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";

const features = [
    {
        icon: FileText,
        title: "Pelayanan Digital",
        description: "Ajukan layanan administrasi desa secara mudah dan efisien.",
    },
    {
        icon: Landmark,
        title: "Informasi Terpercaya",
        description: "Akses berita, agenda, pengumuman, dan transparansi desa.",
    },
    {
        icon: MessageSquare,
        title: "Aspirasi Masyarakat",
        description: "Sampaikan kritik, saran, maupun pengaduan secara online.",
    },
];

export function CTA() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900" />

            <BlurBlob className="absolute -left-24 top-0 -z-10 h-72 w-72 opacity-30" />

            <BlurBlob className="absolute -bottom-32 -right-24 -z-10 h-96 w-96 opacity-20" />

            <Container>
                <Reveal>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-12 lg:p-16">
                        {/* Glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                        <div className="mx-auto max-w-4xl text-center">
                            <FadeUp delay={0}>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                                    <Sparkles className="h-4 w-4 text-yellow-300" />
                                    Smart Village 2026
                                </div>
                            </FadeUp>

                            <FadeUp delay={0.05}>
                                <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-white md:text-5xl xl:text-6xl">
                                    Transformasi Digital Desa
                                    <span className="block text-emerald-200">
                                        Dimulai dari Pelayanan yang Lebih Baik
                                    </span>
                                </h2>
                            </FadeUp>

                            <FadeUp delay={0.1}>
                                <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-emerald-100 md:text-lg">
                                    Website resmi Pemerintah Desa Cintanagara yang menghadirkan
                                    pelayanan publik digital, informasi terpercaya, transparansi
                                    desa, serta komunikasi yang lebih mudah untuk seluruh
                                    masyarakat.
                                </p>
                            </FadeUp>

                            {/* Feature Cards */}
                            <FadeUp delay={0.15}>
                                <div className="mt-14 grid gap-5 md:grid-cols-3">
                                    {features.map((feature) => {
                                        const Icon = feature.icon;

                                        return (
                                            <div
                                                key={feature.title}
                                                className="group rounded-2xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 hover:shadow-xl"
                                            >
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
                                                    <Icon className="h-6 w-6" />
                                                </div>

                                                <h3 className="mt-5 text-lg font-semibold text-white">
                                                    {feature.title}
                                                </h3>

                                                <p className="mt-3 text-sm leading-7 text-emerald-100">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </FadeUp>

                            {/* Buttons */}
                            <FadeUp delay={0.2}>
                                <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        className="group h-12 rounded-xl bg-white px-8 text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-2xl"
                                    >
                                        <Link href="/layanan" className="flex items-center gap-2">
                                            Ajukan Layanan
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="group h-12 rounded-xl border border-white/20 bg-white/10 px-8 text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                                    >
                                        <Link href="/aspirasi" className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" />
                                            Kirim Aspirasi
                                        </Link>
                                    </Button>
                                </div>
                            </FadeUp>

                            {/* Bottom Text */}
                            <FadeUp delay={0.25}>
                                <p className="mt-10 text-sm text-emerald-200">
                                    Pelayanan yang cepat, transparan, dan terintegrasi untuk
                                    mendukung pembangunan Desa Cintanagara menuju{" "}
                                    <span className="font-semibold text-white">Smart Village.</span>
                                </p>
                            </FadeUp>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
