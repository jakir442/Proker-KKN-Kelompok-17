import { Store, Package, Image, ChartColumn } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/shared/layout/DashboardHeader";
import { DashboardSection } from "@/components/dashboard/shared/layout/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/shared/cards/DashboardStatCard";
import { DashboardActionCard } from "@/components/dashboard/shared/cards/DashboardActionCard";

export function UMKMWelcome() {
    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Dashboard UMKM"
                description="Kelola profil usaha, produk, dan informasi UMKM Desa Cintanagara."
            />

            <DashboardSection title="Ringkasan Usaha">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard
                        title="Produk"
                        value="12"
                        description="Produk terdaftar"
                        icon={Package}
                    />

                    <DashboardStatCard
                        title="Galeri"
                        value="36"
                        description="Foto usaha"
                        icon={Image}
                    />

                    <DashboardStatCard
                        title="Pengunjung"
                        value="128"
                        description="Dilihat bulan ini"
                        icon={ChartColumn}
                    />

                    <DashboardStatCard
                        title="Profil"
                        value="100%"
                        description="Data usaha lengkap"
                        icon={Store}
                    />
                </div>
            </DashboardSection>

            <DashboardSection title="Kelola Usaha">
                <div className="grid gap-4 md:grid-cols-2">
                    <DashboardActionCard
                        title="Profil Usaha"
                        description="Perbarui identitas, kontak, lokasi, dan informasi usaha."
                        href="/dashboard/umkm/profile"
                        icon={Store}
                    />

                    <DashboardActionCard
                        title="Produk"
                        description="Kelola daftar produk yang ditampilkan pada website desa."
                        href="/dashboard/umkm/products"
                        icon={Package}
                    />
                </div>
            </DashboardSection>
        </div>
    );
}
