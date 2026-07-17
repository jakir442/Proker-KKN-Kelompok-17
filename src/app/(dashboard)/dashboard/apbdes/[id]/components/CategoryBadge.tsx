"use client";

import { Badge } from "@/components/ui/badge";
import { BudgetCategory } from "@/constants/apbdes";

interface Props {
    category: BudgetCategory;
}

export function CategoryBadge({ category }: Props) {
    switch (category) {
        case BudgetCategory.REVENUE:
            return (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    Pendapatan
                </Badge>
            );

        case BudgetCategory.EXPENDITURE:
            return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Belanja</Badge>;

        case BudgetCategory.FINANCING:
            return <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">Pembiayaan</Badge>;

        default:
            return <Badge variant="secondary">{category}</Badge>;
    }
}
