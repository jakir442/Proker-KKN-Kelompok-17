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

export default async function VillageProfilePage() {
    const result = await getVillageProfilePublicAction();

    if (!result.success || !result.data) {
        return (
            <Container className="py-16">
                <ProfileHero
                    title="Profil Desa Cintanagara"
                    description="Mengenal lebih dekat Desa Cintanagara, Kecamatan Cigedug, Kabupaten Garut. Jelajahi sejarah, visi misi, pemerintahan desa, statistik, dan berbagai informasi resmi dalam satu halaman."
                />
            </Container>
        );
    }

    const profile = result.data;

    return (
        <Container className="py-8 lg:py-10">
            <div className="space-y-24">
                <ProfileHero
                    title="Profil Desa Cintanagara"
                    description="Mengenal lebih dekat Desa Cintanagara, Kecamatan Cigedug, Kabupaten Garut. Jelajahi sejarah, visi misi, pemerintahan desa, statistik, dan berbagai informasi resmi dalam satu halaman."
                />

                <Reveal className="scroll-mt-24">
                    <AboutSection about={profile.about} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <HistorySection history={profile.history} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <VisionMissionSection vision={profile.vision} mission={profile.mission} />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <HeadmanSection
                        name={profile.headmanName}
                        photo={profile.headmanPhoto}
                        greeting={profile.headmanGreeting}
                    />
                </Reveal>

                <Reveal className="scroll-mt-24">
                    <VillageStats
                        area={profile.area}
                        population={profile.population}
                        households={profile.households}
                        rt={profile.rt}
                        rw={profile.rw}
                        hamlets={profile.hamlets}
                    />
                </Reveal>

                <Reveal className="scroll-mt-24 pb-8">
                    <VillageMap latitude={profile.latitude} longitude={profile.longitude} />
                </Reveal>
            </div>
        </Container>
    );
}
