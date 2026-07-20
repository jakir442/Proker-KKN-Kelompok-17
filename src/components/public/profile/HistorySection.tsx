import { Clock3, Landmark, Rocket, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Props {
    history: string;
}

const highlights = [
    {
        title: "Warisan Sejarah",
        description: "Menjaga nilai sejarah dan budaya sebagai identitas Desa Cintanagara.",
        icon: Landmark,
    },
    {
        title: "Gotong Royong",
        description: "Semangat kebersamaan masyarakat menjadi fondasi pembangunan desa.",
        icon: Users,
    },
    {
        title: "Transformasi Smart Village",
        description: "Melangkah menuju desa yang modern melalui pemanfaatan teknologi digital.",
        icon: Rocket,
    },
];

export function HistorySection({ history }: Props) {
    return (
        <section className="relative">
            {/* Background Number */}
            <span className="absolute right-0 top-0 -z-10 text-8xl font-black tracking-tight text-primary/5 md:text-9xl">
                02
            </span>

            {/* Header */}
            <div className="max-w-3xl">
                <Badge variant="secondary" className="rounded-full px-4 py-1">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Sejarah Desa
                </Badge>

                <h2 className="mt-5 text-4xl font-bold tracking-tight">
                    Perjalanan Panjang
                    <span className="block text-primary">Desa Cintanagara</span>
                </h2>

                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    Mengenal perjalanan, perkembangan, dan semangat masyarakat Desa Cintanagara
                    dalam membangun desa hingga menjadi lebih maju, mandiri, dan berdaya saing.
                </p>
            </div>

            {/* Timeline Card */}
            <div className="relative mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative p-8 md:p-10 lg:p-12">
                    <div className="flex gap-6">
                        {/* Timeline */}
                        <div className="relative hidden md:flex">
                            <div className="absolute left-5 top-5 h-full w-px bg-border" />

                            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                <Clock3 className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">Awal Perjalanan Desa</h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Sejarah yang menjadi fondasi perkembangan Desa Cintanagara hingga
                                saat ini.
                            </p>

                            <div className="my-8 h-px bg-border" />

                            <p className="text-lg leading-9 whitespace-pre-line text-muted-foreground">
                                {history}
                            </p>

                            {/* Quote */}
                            <div className="mt-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6">
                                <p className="text-lg italic leading-8 text-foreground">
                                    “Perjalanan panjang Desa Cintanagara menjadi bukti bahwa
                                    semangat gotong royong, kebersamaan, dan inovasi mampu membawa
                                    desa terus berkembang menuju masa depan yang lebih baik.”
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="mt-12">
                        <h4 className="text-lg font-semibold">Nilai-Nilai yang Terus Dijaga</h4>

                        <p className="mt-2 text-muted-foreground">
                            Sejarah Desa Cintanagara tidak hanya menceritakan masa lalu, tetapi juga
                            menjadi inspirasi dalam membangun masa depan yang berkelanjutan.
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            {highlights.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="
                                            group
                                            rounded-2xl
                                            border
                                            bg-background/70
                                            p-6
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-primary/30
                                            hover:shadow-lg
                                        "
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                                            <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                                        </div>

                                        <h4 className="mt-5 font-semibold">{item.title}</h4>

                                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
