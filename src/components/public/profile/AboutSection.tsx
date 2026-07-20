"use client";

import { BookOpen, Landmark, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { FeatureGrid } from "@/components/public/common/FeatureGrid";
import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    about: string;
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

export function AboutSection({ about }: Props) {
    return (
        <section className="relative">
            <SectionHeading
                badge="Tentang Desa"
                title="Mengenal Lebih Dekat"
                highlight="Desa Cintanagara"
                description="Mengenal sejarah, karakteristik, dan potensi Desa Cintanagara sebagai desa yang terus berkembang menuju pelayanan publik yang modern, transparan, dan berbasis digital."
                number="01"
                icon={Sparkles}
            />

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

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

                    <p className="text-lg leading-9 whitespace-pre-line text-muted-foreground">
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
