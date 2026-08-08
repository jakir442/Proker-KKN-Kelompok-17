import { getVillageProfilePublicAction } from "@/actions/public/get-village-profile";

import { Reveal } from "@/components/animations";
import { Container } from "@/components/public/layout/Container";
import { AboutSection } from "@/components/public/profile/AboutSection";
import { HeadmanSection } from "@/components/public/profile/HeadmanSection";
import { HistorySection } from "@/components/public/profile/HistorySection";
import { ProfileHero } from "@/components/public/profile/ProfileHero";
import { VillageMap } from "@/components/public/profile/VillageMap";
import { VillageStats } from "@/components/public/profile/VillageStats";
import { VisionMissionSection } from "@/components/public/profile/VisionMissionSection";

const PROFILE_DESCRIPTION =
    "Mengenal lebih dekat Desa Cintanagara, Kecamatan Cigedug, Kabupaten Garut. Jelajahi sejarah, visi misi, pemerintahan desa, statistik, dan berbagai informasi resmi dalam satu halaman.";

export default async function VillageProfilePage() {
    const result = await getVillageProfilePublicAction();

    if (!result.success || !result.data) {
        return (
            <Container className="py-16">
                <ProfileHero title="Profil Desa Cintanagara" description={PROFILE_DESCRIPTION} />
            </Container>
        );
    }

    const profile = result.data;
    // console.log("HEADMAN PHOTO:", profile.headman.photo);
    // console.log("HEADMAN DATA:", profile.headman);

    return (
        <Container className="py-8 lg:py-10">
            <div className="space-y-24">
                <ProfileHero
                    title={`Profil ${profile.villageName || "Desa Cintanagara"}`}
                    description={PROFILE_DESCRIPTION}
                />

                <Reveal className="scroll-mt-24">
                    <AboutSection about={profile.about} officePhoto={profile.officePhoto} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <HistorySection history={profile.history} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <VisionMissionSection vision={profile.vision} mission={profile.mission} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <HeadmanSection
                        name={profile.headman.name}
                        position={profile.headman.position}
                        photo={profile.headman.photo}
                        photoSettings={profile.headman.photoSettings}
                        greeting={profile.headman.greeting}
                    />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <VillageStats
                        area={profile.statistics.area}
                        population={profile.statistics.population}
                        households={profile.statistics.households}
                        rt={profile.statistics.rt}
                        rw={profile.statistics.rw}
                        hamlets={profile.statistics.hamlets}
                    />
                </Reveal>

                <Reveal className="scroll-mt-24 pb-8">
                    <VillageMap
                        latitude={profile.location.latitude}
                        longitude={profile.location.longitude}
                    />
                </Reveal>
            </div>
        </Container>
    );
}
