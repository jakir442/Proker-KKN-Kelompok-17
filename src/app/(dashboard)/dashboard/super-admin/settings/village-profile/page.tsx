import { findVillageProfile } from "@/repositories/village-profile.repository";

import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { VillageProfileClient } from "@/components/dashboard/admin/village-profile/VillageProfileClient";

export default async function SuperAdminVillageProfilePage() {
    const profile = await findVillageProfile();

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Profil Desa"
                description="Kelola informasi profil Desa Cintanagara."
            />

            <VillageProfileClient profile={profile} />
        </div>
    );
}
