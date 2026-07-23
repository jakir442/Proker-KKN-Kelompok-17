import { getOfficialsAction } from "@/actions/village-official/get-officials";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { OfficialTable } from "@/components/dashboard/super-admin/village-official/OfficialTable";
import { OfficialToolbar } from "@/components/dashboard/super-admin/village-official/OfficialToolbar";

interface Props {
    searchParams: Promise<{
        search?: string;
        status?: string;
        page?: string;
    }>;
}

export default async function VillageOfficialPage({ searchParams }: Props) {
    const params = await searchParams;
    const search = params.search ?? "";
    const status = params.status ?? "ALL";
    const page = Number(params.page ?? "1");

    const result = await getOfficialsAction({
        search,
        status,
        page,
    });

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Pemerintahan Desa"
                description="Kelola perangkat Desa Cintanagara."
            />
            <OfficialToolbar search={search} status={status} />
            <OfficialTable data={result.success ? result.data : []} />
        </div>
    );
}
