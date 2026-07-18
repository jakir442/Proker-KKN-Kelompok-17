import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";

import { AboutSection } from "@/components/public/profile/AboutSection";
import { HistorySection } from "@/components/public/profile/HistorySection";
import { VisionMissionSection } from "@/components/public/profile/VisionMissionSection";
import { HeadmanSection } from "@/components/public/profile/HeadmanSection";
import { VillageStats } from "@/components/public/profile/VillageStats";
import { VillageMap } from "@/components/public/profile/VillageMap";
import { getVillageProfilePublicAction } from "@/actions/public/get-village-profile";

export default async function VillageProfilePage() {
    const result = await getVillageProfilePublicAction();

    if (!result.success || !result.data) {
        return (
            <Container className="py-16">
                <SectionHeader
                    badge="Profil"
                    title="Profil Desa"
                    description="Informasi profil desa belum tersedia."
                />
            </Container>
        );
    }

    const profile = result.data;

    return (
        <Container className="space-y-20 py-12">
            <SectionHeader
                badge="Profil"
                title="Profil Desa Cintanagara"
                description="Mengenal lebih dekat Desa Cintanagara, Kecamatan Cigedug."
            />

            <AboutSection about={profile.about} />

            <HistorySection history={profile.history} />

            <VisionMissionSection vision={profile.vision} mission={profile.mission} />

            <HeadmanSection
                name={profile.headmanName}
                photo={profile.headmanPhoto}
                greeting={profile.headmanGreeting}
            />

            <VillageStats
                area={profile.area}
                population={profile.population}
                households={profile.households}
                rt={profile.rt}
                rw={profile.rw}
                hamlets={profile.hamlets}
            />

            <VillageMap latitude={profile.latitude} longitude={profile.longitude} />
        </Container>
    );
}
