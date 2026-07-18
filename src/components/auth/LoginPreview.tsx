import React from "react";
import { Activity, Bell, CalendarDays, FileText, ShieldCheck, Users } from "lucide-react";

export function LoginPreview() {
    return (
        <div className="animate-enter relative mx-auto mt-12 w-full max-w-5xl">
            <div className="absolute inset-x-20 -top-10 h-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-background/70 shadow-large backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>

                    <div className="rounded-full border border-border/60 bg-background px-4 py-1 text-xs text-muted-foreground">
                        Dashboard Smart Village
                    </div>
                </div>

                <div className="grid gap-8 p-8 lg:grid-cols-[240px_1fr]">
                    <aside className="space-y-3">
                        <SidebarItem icon={<Activity className="h-4 w-4" />} active>
                            Dashboard
                        </SidebarItem>

                        <SidebarItem icon={<Users className="h-4 w-4" />}>Penduduk</SidebarItem>

                        <SidebarItem icon={<FileText className="h-4 w-4" />}>Layanan</SidebarItem>

                        <SidebarItem icon={<CalendarDays className="h-4 w-4" />}>
                            Agenda
                        </SidebarItem>

                        <SidebarItem icon={<Bell className="h-4 w-4" />}>Pengumuman</SidebarItem>
                    </aside>

                    <section>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <StatCard title="Pelayanan" value="Online" />
                            <StatCard title="Transparansi" value="Aktif" />
                            <StatCard title="Status Sistem" value="Normal" />
                        </div>

                        <div className="mt-8 rounded-3xl border border-border/60 bg-muted/20 p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Aktivitas Sistem</h3>

                                    <p className="text-sm text-muted-foreground">
                                        Ringkasan layanan digital desa.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-primary/10 p-2">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <ProgressItem width="90%" />
                                <ProgressItem width="70%" />
                                <ProgressItem width="100%" />
                                <ProgressItem width="55%" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="absolute -right-4 top-10 hidden rounded-2xl border border-primary/20 bg-background/90 p-4 shadow-medium backdrop-blur-xl xl:block">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">Sistem Aktif</p>
                        <p className="text-xs text-muted-foreground">
                            Semua layanan berjalan normal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SidebarItemProps {
    children: React.ReactNode;
    icon: React.ReactNode;
    active?: boolean;
}

function SidebarItem({ children, icon, active = false }: SidebarItemProps) {
    return (
        <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
            {icon}
            {children}
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string;
}

function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-border/60 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-medium">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h4 className="mt-2 text-xl font-bold">{value}</h4>
        </div>
    );
}

interface ProgressItemProps {
    width: string;
}

function ProgressItem({ width }: ProgressItemProps) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>Pelayanan Digital</span>
                <span>{width}</span>
            </div>

            <div className="h-2 rounded-full bg-muted">
                <div
                    className="h-2 rounded-full bg-primary transition-all duration-1000"
                    style={{ width }}
                />
            </div>
        </div>
    );
}
