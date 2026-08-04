import { getVillageProfilePublicAction } from "@/actions/public/get-village-profile";

import { Container } from "../layout/Container";
import { AboutContent } from "./AboutContent";

export async function About() {
    const result = await getVillageProfilePublicAction();

    const profile = result.success ? result.data : null;

    const about =
        profile?.about ??
        "Desa Cintanagara merupakan salah satu desa di Kecamatan Cigedug, Kabupaten Garut yang memiliki potensi pada sektor pertanian, UMKM, pariwisata, serta pemberdayaan masyarakat.";

    const summary = about.length > 260 ? `${about.substring(0, 260)}...` : about;

    const aboutProfile = profile
        ? ({
              headmanPhoto: (profile as { headmanPhoto?: string | null }).headmanPhoto ?? null,
          } satisfies { headmanPhoto?: string | null })
        : null;

    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <Container>
                <AboutContent profile={aboutProfile} summary={summary} />
            </Container>
        </section>
    );
}
