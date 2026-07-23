import {
    ClipboardCheck,
    FileClock,
    BellRing,
    CalendarDays,
    FileText,
    ShieldAlert,
} from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/shared/layout/DashboardHeader";
import { DashboardSection } from "@/components/dashboard/shared/layout/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/shared/cards/DashboardStatCard";
import { DashboardActionCard } from "@/components/dashboard/shared/cards/DashboardActionCard";

export function PetugasWelcome() {
    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Dashboard Petugas"
                description="Kelola pelayanan administrasi dan tindak lanjut laporan warga."
            />

            <DashboardSection title="Ringkasan Pelayanan">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard
                        title="Surat Masuk"
                        value="24"
                        description="Perlu diproses"
                        icon={FileClock}
                    />

                    <DashboardStatCard
                        title="Selesai Hari Ini"
                        value="18"
                        description="Sudah diverifikasi"
                        icon={ClipboardCheck}
                    />

                    <DashboardStatCard
                        title="Pengaduan"
                        value="5"
                        description="Menunggu tindak lanjut"
                        icon={BellRing}
                    />

                    <DashboardStatCard
                        title="Agenda"
                        value="3"
                        description="Kegiatan hari ini"
                        icon={CalendarDays}
                    />
                </div>
            </DashboardSection>

            <DashboardSection title="Akses Cepat">
                <div className="grid gap-4 md:grid-cols-2">
                    <DashboardActionCard
                        title="Pelayanan Surat"
                        description="Proses permohonan administrasi warga."
                        href="/dashboard/petugas/services"
                        icon={FileText}
                    />

                    <DashboardActionCard
                        title="Pengaduan Warga"
                        description="Tindak lanjuti laporan masyarakat."
                        href="/dashboard/petugas/complaints"
                        icon={ShieldAlert}
                    />
                </div>
            </DashboardSection>
        </div>
    );
}
