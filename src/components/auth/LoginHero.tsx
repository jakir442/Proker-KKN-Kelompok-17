import { ArrowUpRight, BadgeCheck, Bell, Building2, FileText, ShieldCheck } from "lucide-react";

export function LoginHero() {
    return (
        <div className="relative flex max-w-2xl flex-col">
            <div className="animate-enter mb-6 badge-premium w-fit gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Sistem Smart Village Aktif
            </div>

            <h1 className="animate-enter text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
                Digitalisasi Pelayanan Desa
                <span className="block text-gradient">Lebih Cepat, Transparan, Modern.</span>
            </h1>

            <p className="animate-enter mt-6 max-w-xl body-lg text-balance">
                Platform digital Pemerintah Desa Cintanagara yang menghubungkan pelayanan
                masyarakat, transparansi anggaran, informasi desa, serta administrasi dalam satu
                sistem terpadu.
            </p>

            <div className="animate-enter mt-10 grid gap-4">
                <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Pelayanan Digital" />
                <Feature icon={<FileText className="h-5 w-5" />} title="Transparansi APBDes" />
                <Feature icon={<Bell className="h-5 w-5" />} title="Informasi & Pengumuman Desa" />
            </div>

            <div className="relative mt-12">
                <div className="rounded-3xl border border-border/60 bg-background/70 p-6 shadow-large backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                <Building2 className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold">Dashboard Smart Village</h3>
                                <p className="text-sm text-muted-foreground">
                                    Pemerintah Desa Cintanagara
                                </p>
                            </div>
                        </div>

                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <Stat title="Layanan" value="35+" />
                        <Stat title="Agenda" value="120+" />
                        <Stat title="Online" value="100%" />
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="h-3 rounded-full bg-muted">
                            <div className="h-3 w-4/5 rounded-full bg-primary" />
                        </div>

                        <div className="h-3 w-2/3 rounded-full bg-muted" />
                        <div className="h-3 w-5/6 rounded-full bg-muted" />
                        <div className="h-3 w-1/2 rounded-full bg-muted" />
                    </div>
                </div>

                <div className="absolute -right-8 -top-8 hidden rounded-2xl border border-primary/20 bg-background/80 p-4 shadow-medium backdrop-blur-xl xl:block">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <BadgeCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Sistem Online</p>
                            <p className="text-xs text-muted-foreground">Berjalan Normal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
}

function Feature({ icon, title }: FeatureProps) {
    return (
        <div className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-x-1 hover:border-primary/30 hover:shadow-medium">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>

            <span className="font-medium">{title}</span>
        </div>
    );
}

interface StatProps {
    title: string;
    value: string;
}

function Stat({ title, value }: StatProps) {
    return (
        <div className="rounded-2xl bg-muted/40 p-4 transition-colors hover:bg-primary/5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
            <h4 className="mt-2 text-2xl font-bold">{value}</h4>
        </div>
    );
}
