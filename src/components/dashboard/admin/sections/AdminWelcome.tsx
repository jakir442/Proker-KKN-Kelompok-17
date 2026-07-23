import { Building2, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface AdminWelcomeProps {
    name: string;
}

export function AdminWelcome({ name }: AdminWelcomeProps) {
    const today = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());

    return (
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_45%)]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                    <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/20">
                        Dashboard Admin Desa
                    </Badge>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Selamat datang, {name}
                        </h1>

                        <p className="max-w-2xl text-white/90">
                            Kelola pelayanan masyarakat, publikasi informasi, serta aktivitas
                            operasional Desa Cintanagara dari satu dashboard yang terintegrasi.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5" />

                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/70">
                                Unit Kerja
                            </p>

                            <p className="font-semibold">Pemerintah Desa Cintanagara</p>
                        </div>
                    </div>

                    <div className="h-px bg-white/15" />

                    <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5" />

                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/70">
                                Hari Ini
                            </p>

                            <p className="font-medium">{today}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
