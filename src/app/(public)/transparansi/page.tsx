import { notFound } from "next/navigation";

import { APBDesRepository } from "@/repositories/apbdes.repository";
import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";

import { APBDesChart } from "@/components/public/apbdes/APBDesChart";
import { APBDesProgress } from "@/components/public/apbdes/APBDesProgress";
import { APBDesPublicTable } from "@/components/public/apbdes/APBDesPublicTable";

export default async function TransparansiPage() {
    const apbdes = await APBDesRepository.findActive();

    if (!apbdes) {
        notFound();
    }

    const id = apbdes._id.toString();

    const items = await APBDesItemRepository.findByAPBDes(id);

    const chartData = await APBDesItemRepository.getChartData(id);

    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);

    const totalRealization = items.reduce((sum, item) => sum + item.realization, 0);

    return (
        <main className="container mx-auto space-y-10 py-12">
            <section>
                <h1 className="text-3xl font-bold">Transparansi Keuangan Desa</h1>

                <p className="text-muted-foreground">APBDes Desa Cintanagara Tahun {apbdes.year}</p>
            </section>

            <APBDesProgress budget={totalBudget} realization={totalRealization} />

            <APBDesChart data={chartData} />

            <section>
                <h2 className="mb-5 text-xl font-bold">Rincian APBDes</h2>

                <APBDesPublicTable items={items} />
            </section>
        </main>
    );
}
