"use client";

import { Card, CardContent } from "@/components/ui/card";

interface BudgetCardProps {
    title: string;
    value: number;
}

export function BudgetCard({ title, value }: BudgetCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{title}</p>

                <h2 className="mt-2 text-2xl font-bold">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                    }).format(value)}
                </h2>
            </CardContent>
        </Card>
    );
}
