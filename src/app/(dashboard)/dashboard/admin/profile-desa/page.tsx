import { getVillageProfileAction } from "@/actions/village-profile/village-profile";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { VillageProfileClient } from "@/components/dashboard/admin/village-profile/VillageProfileClient";

export default async function VillageProfilePage() {
    const result = await getVillageProfileAction();

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Profil Desa"
                description="Kelola informasi resmi Desa Cintanagara yang akan ditampilkan pada website Smart Village."
            />

            <VillageProfileClient profile={result.data} />
        </div>
    );
}
