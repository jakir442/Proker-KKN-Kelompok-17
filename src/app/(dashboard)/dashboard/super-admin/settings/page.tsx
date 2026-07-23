import { SettingsCard } from "@/components/dashboard/super-admin/settings/SettingsCard";
import { Building2, Globe, LockKeyhole, Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Pengaturan Sistem</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Kelola konfigurasi utama website Cintanagara Smart Village.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <SettingsCard
                    title="Informasi Desa"
                    description="Kelola identitas dan informasi utama desa."
                    icon={Building2}
                    href="/dashboard/super-admin/settings/village"
                />
                <SettingsCard
                    title="Website"
                    description="Atur informasi publik dan konfigurasi website."
                    icon={Globe}
                    href="/dashboard/super-admin/settings/website"
                />
                <SettingsCard
                    title="Sistem"
                    description="Konfigurasi fitur dan perilaku aplikasi."
                    icon={Settings}
                    href="/dashboard/super-admin/settings/system"
                />
                <SettingsCard
                    title="Keamanan"
                    description="Kelola keamanan dan akses sistem."
                    icon={LockKeyhole}
                    href="/dashboard/super-admin/settings/security"
                />
            </div>
        </div>
    );
}
