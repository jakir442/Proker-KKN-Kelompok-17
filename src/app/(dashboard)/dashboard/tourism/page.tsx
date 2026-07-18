import { SectionHeader } from "@/components/dashboard/common/SectionHeader";
import { TourismToolbar } from "@/components/dashboard/tourism/TourismToolbar";
import { TourismTable } from "@/components/dashboard/tourism/TourismTable";
import { getTourismsAction } from "@/actions/tourism/get-tourism";

interface Props {
    searchParams: Promise<{
        search?: string;
        category?: string;
        status?: string;
        page?: string;
    }>;
}

export default async function TourismPage({ searchParams }: Props) {
    const params = await searchParams;

    const search = params.search ?? "";
    const category = params.category ?? "ALL";
    const status = params.status ?? "ALL";
    const page = Number(params.page ?? "1");

    const result = await getTourismsAction({
        search,
        category,
        status,
        page,
    });

    const dataFixed = result.data.map((item) => ({
        ...item,
        latitude: item.latitude ?? undefined,
        longitude: item.longitude ?? undefined,
    }));

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Manajemen Wisata"
                description="Kelola seluruh destinasi wisata Desa Cintanagara."
            />

            <TourismToolbar search={search} category={category} status={status} />

            <TourismTable data={dataFixed} />
        </div>
    );
}
