"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartItem {
    name: string;
    budget: number;
    realization: number;
}

interface Props {
    data: ChartItem[];
}

const currency = new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
});

export function APBDesChart({ data }: Props) {
    return (
        <div className="rounded-xl border bg-background p-6">
            <h3 className="mb-6 text-lg font-semibold">Grafik Realisasi Anggaran</h3>

            <ResponsiveContainer width="100%" height={380}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis tickFormatter={(value) => currency.format(value)} />

                    <Tooltip
                        formatter={(value) => {
                            const amount = Number(value ?? 0);

                            return new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                            }).format(amount);
                        }}
                    />

                    <Bar dataKey="budget" name="Anggaran" radius={[8, 8, 0, 0]} />

                    <Bar dataKey="realization" name="Realisasi" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
