import { Compass, Trees, MapPinned } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "../layout/Container";
import { Badge } from "@/components/ui/badge";

import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
    totalTourism?: number;
}

export function TourismHero({ item, totalTourism }: Props) {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <Container className="py-20 md:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <Badge className="rounded-full">Wisata Desa</Badge>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
                        Jelajahi Keindahan
                        <span className="block text-primary">Desa Cintanagara</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
                        Temukan pesona alam, budaya, wisata edukasi, hingga destinasi favorit
                        masyarakat yang ada di Desa Cintanagara.
                    </p>

                    <div className="mt-12 grid gap-4 sm:grid-cols-3">
                        <StatCard
                            icon={<MapPinned className="h-5 w-5" />}
                            value={totalTourism ?? item.name}
                            label="Destinasi"
                        />

                        <StatCard
                            icon={<Trees className="h-5 w-5" />}
                            value="100%"
                            label="Nuansa Alam"
                        />

                        <StatCard
                            icon={<Compass className="h-5 w-5" />}
                            value="6"
                            label="Kategori"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}

interface StatCardProps {
    icon: ReactNode;
    value: number | string;
    label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
    return (
        <div className="rounded-3xl border bg-background/80 p-6 backdrop-blur">
            <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                {icon}
            </div>

            <div className="text-3xl font-bold">{value}</div>

            <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        </div>
    );
}
