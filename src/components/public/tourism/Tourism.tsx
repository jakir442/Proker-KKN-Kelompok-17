import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { TourismCard } from "./TourismCard";

// Sesuaikan dengan nama component animasi yang sudah Anda miliki
import { Reveal } from "@/components/animations/Reveal";
import { FadeIn } from "@/components/animations/FadeIn";

import { Button } from "@/components/ui/button";
import { findFeaturedTourism } from "@/repositories/tourism.repository";

export async function Tourism() {
    const tourism = await findFeaturedTourism(6);

    return (
        <section className="relative overflow-hidden py-20 md:py-24 lg:py-28">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <Container>
                <div className="space-y-14">
                    <Reveal>
                        <div className="space-y-8">
                            <div className="flex justify-center text-center">
                                <SectionHeader
                                    badge="Wisata Desa"
                                    title="Jelajahi Destinasi Wisata Cintanagara"
                                    description="Temukan keindahan alam, udara yang sejuk, serta berbagai destinasi wisata unggulan yang menjadi kebanggaan Desa Cintanagara."
                                />
                            </div>

                            {tourism.length > 0 && (
                                <div className="flex justify-end">
                                    <Button variant="outline" className="group w-full sm:w-auto">
                                        <Link
                                            href="/wisata"
                                            className="inline-flex items-center gap-2"
                                        >
                                            Lihat Semua
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {tourism.length > 0 ? (
                        <FadeIn>
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {tourism.map((item, index) => (
                                    <div
                                        key={item._id.toString()}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                                        style={{
                                            animationDelay: `${index * 120}ms`,
                                            animationFillMode: "both",
                                        }}
                                    >
                                        <TourismCard
                                            id={item._id.toString()}
                                            slug={item.slug}
                                            name={item.name}
                                            image={item.image}
                                            location={item.address}
                                            description={item.shortDescription}
                                            category={item.category}
                                        />
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    ) : (
                        <Reveal>
                            <div className="flex flex-col items-center rounded-3xl border border-dashed bg-muted/30 px-8 py-20 text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Compass className="h-8 w-8" />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Destinasi Wisata Belum Tersedia
                                </h3>

                                <p className="mt-3 max-w-lg text-muted-foreground">
                                    Saat ini belum ada destinasi wisata yang dipublikasikan. Silakan
                                    kembali lagi nanti untuk melihat tempat-tempat menarik di Desa
                                    Cintanagara.
                                </p>
                            </div>
                        </Reveal>
                    )}
                </div>
            </Container>
        </section>
    );
}
