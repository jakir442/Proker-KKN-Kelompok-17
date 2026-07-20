"use client";

import { CheckCircle2, Compass, Goal, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    vision: string;
    mission: string[];
}

export function VisionMissionSection({ vision, mission }: Props) {
    return (
        <section className="relative">
            <SectionHeading
                badge="Visi & Misi"
                title="Membangun Masa Depan"
                highlight="Desa Cintanagara"
                description="Visi dan misi menjadi arah pembangunan Desa Cintanagara dalam mewujudkan pelayanan publik yang berkualitas, pemerintahan yang transparan, serta masyarakat yang mandiri dan sejahtera."
                number="03"
                icon={Sparkles}
            />

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
                {/* Background Decoration */}
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

                <div className="grid lg:grid-cols-2">
                    {/* ================= VISION ================= */}

                    <div className="relative border-b border-border p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
                        <Compass className="absolute right-8 top-8 h-24 w-24 text-primary/10" />

                        <div className="relative">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                                <Compass className="h-7 w-7 text-primary" />
                            </div>

                            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                                Vision
                            </p>

                            <h3 className="mt-2 text-3xl font-bold tracking-tight">Visi Desa</h3>

                            <div className="my-8 h-px bg-border" />

                            <div className="rounded-3xl bg-primary/5 p-8">
                                <code className="block whitespace-pre-wrap font-serif text-xl leading-10 text-foreground">
                                    {`\`${vision}\``}
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* ================= MISSION ================= */}

                    <div className="p-8 md:p-10 lg:p-12">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <Goal className="h-7 w-7 text-primary" />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                            Mission
                        </p>

                        <h3 className="mt-2 text-3xl font-bold tracking-tight">Misi Desa</h3>

                        <div className="my-8 h-px bg-border" />

                        <div className="space-y-6">
                            {mission.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 pb-6 last:pb-0 border-b last:border-0"
                                >
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold">Misi {index + 1}</h4>

                                        <p className="mt-2 leading-8 text-muted-foreground">
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
