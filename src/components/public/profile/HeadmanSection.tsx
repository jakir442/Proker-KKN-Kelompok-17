"use client";

import Image from "next/image";
import { MapPin, Quote, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    name: string;
    position: string;
    photo?: string;
    greeting: string;
    photoSettings?: {
        zoom: number;
        positionX: number;
        positionY: number;
    };
}

export function HeadmanSection({ name, position, photo, greeting, photoSettings }: Props) {
    const imageSrc = photo && photo.trim() !== "" ? photo : "/images/avatar-placeholder.jpg";

    const zoom = photoSettings?.zoom ?? 1;
    const positionX = photoSettings?.positionX ?? 50;
    const positionY = photoSettings?.positionY ?? 50;

    return (
        <section className="relative overflow-hidden">
            {/* =========================================================
                HEADER
            ========================================================== */}
            <SectionHeading
                badge="Pemerintahan Desa"
                title="Kepala Desa Cintanagara"
                description="Mengenal sosok pemimpin Desa Cintanagara beserta pesan dan sambutan untuk seluruh masyarakat."
            />

            {/* =========================================================
                MAIN
            ========================================================== */}
            <div className="mx-auto mt-10 w-full max-w-6xl sm:mt-12 lg:mt-16">
                <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-16">
                    {/* =====================================================
                        PROFILE CARD
                    ====================================================== */}
                    <div className="group relative overflow-hidden rounded-[2rem] border bg-muted shadow-xl">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src={imageSrc}
                                alt={`Foto ${name}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 380px"
                                className="object-cover"
                                style={{
                                    objectPosition: `${positionX}% ${positionY}%`,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: "center center",
                                }}
                            />

                            {/* Overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                            {/* Position Badge */}
                            <div className="absolute left-5 top-5">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    {position}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                <h3 className="text-2xl font-bold tracking-tight">{name}</h3>

                                <p className="mt-1 text-sm text-white/80">{position}</p>

                                <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                                    <MapPin className="h-4 w-4 shrink-0" />

                                    <span>Kecamatan Cigedug, Kabupaten Garut</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        GREETING
                    ====================================================== */}
                    <div className="min-w-0">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                                <Sparkles className="h-3.5 w-3.5" />
                            </span>

                            <span>Sambutan Kepala Desa</span>
                        </div>

                        {/* Heading */}
                        <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                            Pesan untuk Masyarakat
                        </h3>

                        {/* Greeting Card */}
                        <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border bg-card shadow-sm sm:mt-8">
                            {/* Decorative background */}
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/[0.045] blur-2xl" />

                            <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-primary/[0.025] blur-2xl" />

                            <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                                {/* Quote icon */}
                                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                    <Quote className="h-5 w-5 text-primary" />
                                </div>

                                {/* Greeting */}
                                <p className="max-w-3xl whitespace-pre-line text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-[17px]">
                                    {greeting}
                                </p>

                                {/* Signature */}
                                <div className="mt-8 border-t pt-6 sm:mt-10 sm:pt-7">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-1 rounded-full bg-primary" />

                                        <div>
                                            <p className="text-sm font-bold sm:text-base">{name}</p>

                                            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                                                {position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
