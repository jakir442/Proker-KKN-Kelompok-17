"use client";

import Image from "next/image";
import { BookOpen, Landmark, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { FeatureGrid } from "@/components/public/common/FeatureGrid";
import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    about: string;
    officePhoto?: string;
}

const highlights = [
    {
        title: "Pelayanan Digital",
        description: "Layanan publik yang mudah diakses masyarakat.",
        icon: ShieldCheck,
    },
    {
        title: "Potensi Lokal",
        description: "Pertanian, UMKM, wisata, dan sumber daya desa.",
        icon: Leaf,
    },
    {
        title: "Pemerintahan Transparan",
        description: "Informasi desa yang terbuka dan akuntabel.",
        icon: Landmark,
    },
];

export function AboutSection({ about, officePhoto }: Props) {
    return (
        <section>
            <SectionHeading
                badge="Tentang Desa"
                title="Tentang Desa"
                description="Mengenal lebih dekat Desa Cintanagara dan arah pengembangannya menuju desa yang modern dan berkelanjutan."
            />

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

                {officePhoto && (
                    <div className="relative overflow-hidden">
                        <Image
                            src={officePhoto}
                            alt="Kantor Desa Cintanagara"
                            width={1600}
                            height={900}
                            className="aspect-[16/7] w-full object-cover"
                            priority={false}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                            <div className="flex items-center gap-3 rounded-2xl bg-black/50 px-4 py-3 text-white backdrop-blur-md sm:px-5 sm:py-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                    <Landmark className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold sm:text-base">
                                        Kantor Desa Cintanagara
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-white/70 sm:text-sm">
                                        Kecamatan Cigedug, Kabupaten Garut
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative p-8 md:p-10 lg:p-12">
                    <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-primary/10 p-4">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Profil Singkat Desa</h3>

                            <p className="text-sm text-muted-foreground">
                                Informasi umum mengenai Desa Cintanagara.
                            </p>
                        </div>
                    </div>

                    <div className="my-8 h-px bg-border" />

                    <p className="whitespace-pre-line text-lg leading-9 text-muted-foreground">
                        {about}
                    </p>

                    <p className="mt-8 border-l-4 border-primary/30 pl-5 text-base leading-8 text-muted-foreground">
                        Melalui transformasi menuju{" "}
                        <span className="font-semibold text-foreground">Smart Village</span>, Desa
                        Cintanagara berkomitmen menghadirkan pelayanan publik yang lebih cepat,
                        transparan, dan mudah diakses. Dengan mengoptimalkan potensi lokal serta
                        mendorong partisipasi masyarakat, desa terus berkembang menjadi lingkungan
                        yang inovatif, mandiri, dan berkelanjutan.
                    </p>

                    <FeatureGrid
                        title="Fokus Pengembangan Desa"
                        description="Tiga pilar utama yang menjadi fokus pembangunan dan pelayanan Desa Cintanagara."
                        items={highlights}
                    />
                </div>
            </div>
        </section>
    );
}
