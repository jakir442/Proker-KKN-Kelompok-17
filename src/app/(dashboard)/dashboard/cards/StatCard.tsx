import { LucideIcon, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    trend?: string;
    trendLabel?: string;
}

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendLabel,
}: StatCardProps) {
    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                {trend && (
                    <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">{trend}</span>
                        <span className="text-muted-foreground">{trendLabel}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
