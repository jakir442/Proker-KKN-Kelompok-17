import { getVillageOfficialsPublicAction } from "@/actions/public/get-village-officials";

import { SectionHeader } from "@/components/public/common/SectionHeader";
import { Container } from "@/components/public/layout/Container";

import { OfficialGrid } from "@/components/public/official/OfficialGrid";

export default async function VillageOfficialPage() {
    const result = await getVillageOfficialsPublicAction();

    return (
        <Container className="space-y-12 py-12">
            <SectionHeader
                badge="Pemerintahan"
                title="Pemerintahan Desa Cintanagara"
                description="Struktur pemerintahan dan perangkat Desa Cintanagara."
            />

            {!result.success || result.data.length === 0 ? (
                <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
                    Data perangkat desa belum tersedia.
                </div>
            ) : (
                <OfficialGrid officials={result.data} />
            )}
        </Container>
    );
}
