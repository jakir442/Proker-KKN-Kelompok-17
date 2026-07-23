import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { ServiceToolbar } from "@/components/dashboard/super-admin/service/ServiceToolbar";
import { ServiceTable } from "@/components/dashboard/super-admin/service/ServiceTable";
import { getServicesAction } from "@/actions/service/get-services";

interface Props {
    searchParams: Promise<{
        search?: string;
        status?: string;
        page?: string;
    }>;
}

export default async function ServicePage({ searchParams }: Props) {
    const params = await searchParams;

    const search = params.search ?? "";
    const status = params.status ?? "ALL";
    const page = Number(params.page ?? "1");

    const result = await getServicesAction({
        search,
        status,
        page,
    });

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Manajemen Layanan"
                description="Kelola seluruh layanan administrasi Desa Cintanagara."
            />

            <ServiceToolbar search={search} status={status} />

            <ServiceTable data={result.data} />
        </div>
    );
}
