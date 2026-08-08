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
        <section>
            <div className="relative">
                <SectionHeading
                    badge="Pemerintahan Desa"
                    title="Kepala Desa Cintanagara"
                    description="Mengenal sosok pemimpin Desa Cintanagara beserta pesan dan sambutan untuk seluruh masyarakat."
                />

                {/* ================= CONTENT ================= */}
                <div className="mt-12 grid items-start gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-16">
                    {/* ================= PHOTO ================= */}
                    <div className="self-start">
                        <div className="group relative overflow-hidden rounded-[2rem] border bg-muted shadow-xl">
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <Image
                                    src={imageSrc}
                                    alt={`Foto ${name}`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 380px"
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                    style={{
                                        objectPosition: `${positionX}% ${positionY}%`,
                                        transform: `scale(${zoom})`,
                                    }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="min-w-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <Quote className="h-7 w-7 text-primary" />
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            <Sparkles className="h-4 w-4 shrink-0" />

                            <span>Sambutan Kepala Desa</span>
                        </div>

                        <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Pesan untuk Masyarakat
                        </h3>

                        <div className="my-8 h-px bg-border" />

                        {/* ================= GREETING ================= */}
                        <div className="relative overflow-hidden rounded-[2rem] bg-primary/5 p-6 sm:p-8">
                            <Quote className="absolute left-6 top-6 h-12 w-12 text-primary/10" />

                            <div className="relative pl-7">
                                <p className="whitespace-pre-line text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                                    {greeting}
                                </p>
                            </div>
                        </div>

                        {/* ================= SIGNATURE ================= */}
                        <div className="mt-8">
                            <div className="h-px w-32 bg-border" />

                            <h4 className="mt-5 text-xl font-bold">{name}</h4>

                            <p className="mt-1 text-sm text-muted-foreground">{position}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
