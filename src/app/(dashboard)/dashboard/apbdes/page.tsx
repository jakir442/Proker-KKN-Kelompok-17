import { getAPBDesAction } from "@/actions/apbdes/get-apbdes";
import { APBDesDialog } from "@/components/dashboard/apbdes/APBDesDialog";
import { APBDesTable } from "@/components/dashboard/apbdes/APBDesTable";
import { SectionHeader } from "@/components/dashboard/common/SectionHeader";

export default async function APBDesPage() {
    const result = await getAPBDesAction({});

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Manajemen APBDes"
                description="Kelola APBDes dan transparansi keuangan Desa Cintanagara."
            >
                <APBDesDialog />
            </SectionHeader>

            <APBDesTable data={result.data} />
        </div>
    );
}
