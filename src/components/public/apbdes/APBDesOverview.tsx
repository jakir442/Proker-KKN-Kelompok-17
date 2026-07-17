import Link from "next/link";

import { APBDesRepository } from "@/repositories/apbdes.repository";
import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";
import { Button } from "@/components/ui/button";

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export async function APBDesOverview() {
    const apbdes = await APBDesRepository.findActive();

    if (!apbdes) {
        return null;
    }

    const items = await APBDesItemRepository.findByAPBDes(apbdes._id.toString());
    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);
    const totalRealization = items.reduce((sum, item) => sum + item.realization, 0);
    const percentage = totalBudget === 0 ? 0 : Math.round((totalRealization / totalBudget) * 100);

    return (
        <section className="container mx-auto space-y-6 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Transparansi Keuangan Desa</h2>

                <p className="mt-2 text-muted-foreground">
                    Ringkasan APBDes Desa Cintanagara Tahun {apbdes.year}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">Total Anggaran</p>
                    <h3 className="mt-2 text-2xl font-bold">{currency.format(totalBudget)}</h3>
                </div>

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">Realisasi</p>
                    <h3 className="mt-2 text-2xl font-bold">{currency.format(totalRealization)}</h3>
                </div>

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-muted-foreground">Persentase Realisasi</p>
                    <h3 className="mt-2 text-2xl font-bold">{percentage}%</h3>
                </div>
            </div>

            <div className="flex justify-center">
                <Button>
                    <Link href="/transparansi">Lihat Transparansi Keuangan</Link>
                </Button>
            </div>
        </section>
    );
}
