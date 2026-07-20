"use client";

import Image from "next/image";
import { MapPin, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    name: string;
    photo?: string;
    greeting: string;
}

export function HeadmanSection({ name, photo, greeting }: Props) {
    return (
        <section className="relative">
            <SectionHeading
                badge="Kepala Desa"
                title="Memimpin dengan Integritas"
                highlight="Melayani dengan Hati"
                description="Kepala Desa memiliki peran penting dalam mewujudkan tata kelola pemerintahan yang profesional, transparan, serta berorientasi pada pelayanan masyarakat."
                number="04"
                icon={Sparkles}
            />
            <div className="relative mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
                {/* Background Decoration */}
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="grid gap-12 p-8 lg:grid-cols-[380px_1fr] lg:p-12">
                    {/* ================= PHOTO ================= */}
                    <div className="mx-auto w-full max-w-[380px]">
                        <div className="group relative overflow-hidden rounded-[2rem] border shadow-lg">
                            <Image
                                src={photo || "/images/avatar-placeholder.png"}
                                alt={name}
                                width={380}
                                height={480}
                                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Badge */}
                            <div className="absolute left-5 top-5">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Kepala Desa
                                </div>
                            </div>

                            {/* Name */}
                            <div className="absolute bottom-0 w-full p-6 text-white">
                                <h3 className="text-2xl font-bold">{name}</h3>
                                <p className="mt-1 text-sm text-white/80">
                                    Kepala Desa Cintanagara
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                                    <MapPin className="h-4 w-4" />
                                    Kecamatan Cigedug, Kabupaten Garut
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="flex flex-col justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <Quote className="h-7 w-7 text-primary" />
                        </div>
                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                            Sambutan Kepala Desa
                        </p>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight">
                            Pesan untuk Masyarakat
                        </h3>
                        <div className="my-8 h-px bg-border" />

                        {/* Quote */}
                        <div className="relative rounded-[2rem] bg-primary/5 p-8">
                            <Quote className="absolute left-6 top-6 h-12 w-12 text-primary/15" />
                            <div className="relative pl-8">
                                <p className="whitespace-pre-line text-lg leading-9 text-muted-foreground">
                                    {greeting}
                                </p>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="mt-10">
                            <div className="h-px w-48 bg-border" />
                            <h4 className="mt-6 text-xl font-bold">{name}</h4>
                            <p className="mt-1 text-muted-foreground">Kepala Desa Cintanagara</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
