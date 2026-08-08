"use client";

import Image from "next/image";
import { MapPin, Quote, Sparkles } from "lucide-react";

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
                    <div className="mx-auto w-full max-w-[320px] md:max-w-[280px] lg:mx-0 lg:max-w-[280px] xl:max-w-[300px]">
                        <div className="overflow-hidden rounded-[1.75rem] border bg-card shadow-sm">
                            {/* PHOTO */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                <Image
                                    src={imageSrc}
                                    alt={`Foto ${name}`}
                                    fill
                                    sizes="
                                        (max-width: 767px) 320px,
                                        (max-width: 1023px) 280px,
                                        (max-width: 1279px) 280px,
                                        300px
                                    "
                                    className="object-cover"
                                    style={{
                                        objectPosition: `${positionX}% ${positionY}%`,
                                        transform: `scale(${zoom})`,
                                    }}
                                />

                                {/* Subtle bottom gradient */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                            </div>

                            {/* PROFILE INFO */}
                            <div className="p-5 sm:p-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                                        {name}
                                    </h3>

                                    <p className="text-sm font-medium text-primary">{position}</p>
                                </div>

                                <div className="mt-4 flex items-start gap-2.5 border-t pt-4 text-xs leading-5 text-muted-foreground sm:text-sm">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />

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
