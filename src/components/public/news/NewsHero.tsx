import { Newspaper, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "../layout/Container";

import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";

interface NewsHeroProps {
    totalNews?: number;
}

export function NewsHero({ totalNews }: NewsHeroProps) {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-sky-400/10 blur-3xl" />
            </div>

            <Container>
                <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
                    <FadeIn>
                        <Badge
                            variant="secondary"
                            className="rounded-full border bg-background/80 px-4 py-1.5 backdrop-blur"
                        >
                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            Berita Desa
                        </Badge>
                    </FadeIn>

                    <Reveal>
                        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Berita & Informasi
                            <span className="block text-primary">Desa Cintanagara</span>
                        </h1>
                    </Reveal>

                    <Reveal>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Ikuti perkembangan terbaru mengenai kegiatan, pelayanan, pembangunan,
                            serta informasi penting Pemerintah Desa Cintanagara secara cepat dan
                            terpercaya.
                        </p>
                    </Reveal>

                    <Stagger className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center gap-3 rounded-2xl border bg-background/70 px-5 py-3 shadow-sm backdrop-blur">
                            <div className="rounded-xl bg-primary/10 p-2">
                                <Newspaper className="h-5 w-5 text-primary" />
                            </div>

                            <div className="text-left">
                                <p className="text-xs text-muted-foreground">Total Berita</p>

                                <p className="font-semibold">{totalNews ?? "-"} Artikel</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-background/70 px-5 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur">
                            ✨ Informasi diperbarui secara berkala
                        </div>
                    </Stagger>
                </div>
            </Container>
        </section>
    );
}
