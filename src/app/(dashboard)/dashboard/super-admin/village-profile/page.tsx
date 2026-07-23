import { getVillageProfileAction } from "@/actions/village-profile/get-village-profile";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { VillageProfileForm } from "@/components/dashboard/super-admin/village-profile/VillageProfileForm";

export default async function VillageProfilePage() {
    const result = await getVillageProfileAction();

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Profil Desa"
                description="Kelola informasi resmi Desa Cintanagara."
            />

            <VillageProfileForm initialData={result.success ? result.data : undefined} />
        </div>
    );
}
