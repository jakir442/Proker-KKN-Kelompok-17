import { Store, Star, CheckCircle, XCircle } from "lucide-react";

import { getUMKMsAction } from "@/actions/umkm/get-umkm";

import { SectionHeader } from "../../common/SectionHeader";
import { StatCard } from "../../cards/StatCard";
import { UMKMClient } from "./UMKMClient";

interface UMKMPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        status?: string;
        page?: string;
        limit?: string;
    }>;
}

export default async function UMKMPage({ searchParams }: UMKMPageProps) {
    const params = await searchParams;

    const result = await getUMKMsAction({
        search: params.search,
        category: params.category,
        status: params.status,
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
    });

    const umkms = result.success ? result.data : [];

    return (
        <div className="space-y-6">
            <SectionHeader
                title="UMKM Management"
                description="Kelola seluruh data UMKM Desa Cintanagara."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {" "}
                <StatCard
                    title="Total UMKM"
                    value={result.total}
                    description="Seluruh UMKM"
                    icon={Store}
                />{" "}
                <StatCard
                    title="UMKM Unggulan"
                    value="-"
                    description="Segera tersedia"
                    icon={Star}
                />{" "}
                <StatCard
                    title="Aktif"
                    value="-"
                    description="Segera tersedia"
                    icon={CheckCircle}
                />{" "}
                <StatCard
                    title="Nonaktif"
                    value="-"
                    description="Segera tersedia"
                    icon={XCircle}
                />{" "}
            </div>

            <UMKMClient
                umkms={umkms}
                search={params.search ?? ""}
                category={params.category ?? "ALL"}
                status={params.status ?? "ALL"}
            />
        </div>
    );
}
