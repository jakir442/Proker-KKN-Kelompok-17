import { getComplaints } from "@/actions/complaint/complaint";
import { SectionHeader } from "@/components/dashboard/common/SectionHeader";
import { ComplaintTable } from "@/components/dashboard/complaints/ComplaintTable";

interface Props {
    searchParams: Promise<{
        search?: string;
        status?: string;
        category?: string;
    }>;
}

export default async function ComplaintsPage({ searchParams }: Props) {
    const params = await searchParams;

    const result = await getComplaints({
        search: params.search,
        status: params.status,
        category: params.category,
    });

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Aspirasi & Pengaduan"
                description="Kelola aspirasi dan pengaduan warga."
            />

            <ComplaintTable data={result.success ? (result.data ?? []) : []} />
        </div>
    );
}
