import { Users, Home, MapPinned, Landmark } from "lucide-react";

import { Container } from "../layout/Container";

const stats = [
    {
        icon: Users,
        value: "2.530",
        label: "Penduduk",
    },
    {
        icon: Home,
        value: "720",
        label: "KK",
    },
    {
        icon: Landmark,
        value: "6",
        label: "RW",
    },
    {
        icon: MapPinned,
        value: "18",
        label: "RT",
    },
];

export function Stats() {
    return (
        <section className="py-15">
            <Container>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="rounded-2xl bg-white p-8 text-center shadow-sm"
                            >
                                <Icon className="mx-auto h-10 w-10 text-emerald-600" />

                                <h3 className="mt-4 text-4xl font-bold">{item.value}</h3>

                                <p className="mt-2 text-slate-600">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
