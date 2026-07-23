import { notFound } from "next/navigation";
import { APBDesRepository } from "@/repositories/apbdes.repository";
import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { APBDesSummary } from "./components/APBDesSummary";
import { APBDesItemTable } from "./components/APBDesItemTable";
import { APBDesItemDialog } from "./components/APBDesItemDialog";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function APBDesDetailPage({ params }: Props) {
    const { id } = await params;

    const apbdes = await APBDesRepository.findById(id);

    if (!apbdes) {
        notFound();
    }

    const items = await APBDesItemRepository.findByAPBDes(id);

    return (
        <div className="space-y-8">
            <SectionHeader title={apbdes.title} description={`APBDes Tahun ${apbdes.year}`}>
                <APBDesItemDialog apbdesId={id} />
            </SectionHeader>

            <APBDesSummary items={items} />

            <APBDesItemTable apbdesId={id} data={items} />
        </div>
    );
}
