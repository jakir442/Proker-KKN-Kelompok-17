import { APBDesItemTableData } from "@/types/apbdes-item";

interface Props {
    items: APBDesItemTableData[];
}

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export function APBDesPublicTable({ items }: Props) {
    return (
        <div className="rounded-xl border overflow-hidden">
            <table className="w-full">
                <thead className="bg-muted">
                    <tr>
                        <th className="p-4 text-left">Kategori</th>

                        <th className="p-4 text-left">Nama</th>

                        <th className="p-4 text-right">Anggaran</th>

                        <th className="p-4 text-right">Realisasi</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="p-4">{item.category}</td>

                            <td className="p-4">{item.name}</td>

                            <td className="p-4 text-right">{currency.format(item.budget)}</td>

                            <td className="p-4 text-right">{currency.format(item.realization)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
