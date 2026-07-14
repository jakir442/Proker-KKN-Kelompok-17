import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, FileText, Store, Users, Wallet } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { StatCard } from "./cards/StatCard";
import { SectionHeader } from "./common/SectionHeader";
import { EmptyState } from "./common/EmptyState";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Dashboard"
                description="Ringkasan informasi Smart Village Cintanagara"
            />

            {/* Welcome Banner */}
            <div className="rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 p-6 text-white shadow">
                <h2 className="text-2xl font-bold">
                    Selamat datang kembali, {session.user.name}! 👋
                </h2>
                <p className="mt-2 text-emerald-100">
                    Semoga harimu menyenangkan. Berikut ringkasan informasi Smart Village
                    Cintanagara hari ini.
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-emerald-100">
                    <div>
                        <span className="font-semibold">Role:</span> {session.user.role}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span> Online
                    </div>
                </div>
            </div>

            {/* Statistik */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Pengguna"
                    value="125"
                    description="Total Pengguna"
                    icon={Users}
                    trend="+12%"
                    trendLabel="bulan ini"
                />
                <StatCard
                    title="APBDes"
                    value="Rp 250 Juta"
                    description="Total Anggaran"
                    icon={Wallet}
                />
                <StatCard title="Surat" value="89" description="Surat Diproses" icon={FileText} />
                <StatCard title="UMKM" value="34" description="UMKM Terdaftar" icon={Store} />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Aksi Cepat</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Link href="/dashboard/users">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola Pengguna
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/letters">
                        <Button variant="outline" className="w-full justify-between">
                            Administrasi Surat
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/umkm">
                        <Button variant="outline" className="w-full justify-between">
                            Data UMKM
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/apbdes">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola APBDes
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/content/news">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola Berita
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/tourism">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola Wisata
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/service">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola Layanan
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard/gallery">
                        <Button variant="outline" className="w-full justify-between">
                            Kelola Gallery
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Aktivitas Terbaru</h2>
                <EmptyState
                    title="Belum ada aktivitas"
                    description="Aktivitas terbaru akan muncul di sini ketika pengguna mulai menggunakan sistem."
                />
            </div>
        </div>
    );
}
