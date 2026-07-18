"use client";

import { APBDesItemTableData } from "@/types/apbdes-item";
import { BudgetCard } from "./BudgetCard";
import { BudgetCategory } from "@/constants/apbdes";

interface Props {
    items: APBDesItemTableData[];
}

export function APBDesSummary({ items }: Props) {
    const revenue = items
        .filter((item) => item.category === BudgetCategory.REVENUE)
        .reduce((sum, item) => sum + item.budget, 0);

    const expenditure = items
        .filter((item) => item.category === BudgetCategory.EXPENDITURE)
        .reduce((sum, item) => sum + item.budget, 0);

    const financing = items
        .filter((item) => item.category === BudgetCategory.FINANCING)
        .reduce((sum, item) => sum + item.budget, 0);

    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);

    const totalRealization = items.reduce((sum, item) => sum + item.realization, 0);

    const percentage = totalBudget === 0 ? 0 : Math.round((totalRealization / totalBudget) * 100);

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <BudgetCard title="Pendapatan" value={revenue} />

                <BudgetCard title="Belanja" value={expenditure} />

                <BudgetCard title="Pembiayaan" value={financing} />

                <BudgetCard title="Total Anggaran" value={totalBudget} />
            </div>

            <div className="rounded-xl border p-6">
                <div className="mb-2 flex justify-between">
                    <span className="font-medium">Realisasi Anggaran</span>

                    <span className="font-bold">{percentage}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                    }).format(totalRealization)}

                    {" / "}

                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                    }).format(totalBudget)}
                </p>
            </div>
        </>
    );
}
