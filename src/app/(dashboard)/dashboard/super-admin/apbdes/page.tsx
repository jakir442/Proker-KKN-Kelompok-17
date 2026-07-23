import { getAPBDesAction } from "@/actions/apbdes/get-apbdes";
import { APBDesDialog } from "@/components/dashboard/super-admin/apbdes/APBDesDialog";
import { APBDesTable } from "@/components/dashboard/super-admin/apbdes/APBDesTable";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";

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
