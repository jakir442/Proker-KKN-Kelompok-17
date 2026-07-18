import { Users, Home, Map, Building2, Landmark, Trees } from "lucide-react";

interface Props {
    area: number;

    population: number;

    households: number;

    rt: number;

    rw: number;

    hamlets: number;
}

export function VillageStats({ area, population, households, rt, rw, hamlets }: Props) {
    const stats = [
        {
            title: "Luas Wilayah",
            value: `${area} Ha`,
            icon: Map,
        },
        {
            title: "Jumlah Penduduk",
            value: population.toLocaleString("id-ID"),
            icon: Users,
        },
        {
            title: "Kepala Keluarga",
            value: households.toLocaleString("id-ID"),
            icon: Home,
        },
        {
            title: "RT",
            value: rt,
            icon: Building2,
        },
        {
            title: "RW",
            value: rw,
            icon: Landmark,
        },
        {
            title: "Dusun",
            value: hamlets,
            icon: Trees,
        },
    ];

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold">Statistik Desa</h2>

                <p className="mt-2 text-muted-foreground">Data umum Desa Cintanagara.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl border bg-card p-6 transition hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">{item.title}</p>

                                    <h3 className="mt-1 text-2xl font-bold">{item.value}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
