import Image from "next/image";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/public/layout/Container";
import { Badge } from "@/components/ui/badge";

import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
}

export function TourismGallery({ item }: Props) {
    const images = [item.image, ...(item.gallery ?? [])];
    const displayImages = images.slice(0, 5);
    const hasGallery = displayImages.length > 1;

    return (
        <section className="py-20">
            <Container>
                <FadeIn>
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <Badge className="rounded-full px-4 py-1">Galeri</Badge>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                                Jelajahi Destinasi
                            </h2>

                            <p className="mt-4 text-muted-foreground">
                                Lihat berbagai sudut keindahan destinasi wisata Desa Cintanagara.
                            </p>
                        </div>

                        <div
                            className={
                                hasGallery ? "grid gap-4 lg:grid-cols-3" : "mx-auto max-w-5xl"
                            }
                        >
                            {/* Hero Image */}
                            <div
                                className={
                                    hasGallery
                                        ? "relative overflow-hidden rounded-3xl lg:col-span-2"
                                        : "relative overflow-hidden rounded-3xl"
                                }
                            >
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src={displayImages[0]}
                                        alt={item.name}
                                        fill
                                        priority
                                        sizes="(max-width:1024px) 100vw, 66vw"
                                        className="object-cover object-center transition duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Thumbnail */}
                            {hasGallery && (
                                <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
                                    {displayImages.slice(1).map((image, index) => {
                                        const isLast = index === 3 && images.length > 5;

                                        return (
                                            <div
                                                key={image}
                                                className="group relative overflow-hidden rounded-2xl"
                                            >
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={image}
                                                        alt={`${item.name}-${index + 2}`}
                                                        fill
                                                        sizes="(max-width:1024px) 100vw, 66vw"
                                                        className="object-cover object-center transition duration-700 hover:scale-105"
                                                    />

                                                    {isLast && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm">
                                                            <span className="text-2xl font-bold text-white">
                                                                +{images.length - 5}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
