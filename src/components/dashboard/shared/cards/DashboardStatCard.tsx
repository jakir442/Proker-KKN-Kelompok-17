import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
    title: string;
    value: string;
    description?: string;
    icon: LucideIcon;
    color?: "blue" | "emerald" | "amber" | "violet" | "rose";
}

const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    violet: "bg-violet-500/10 text-violet-600",
    rose: "bg-rose-500/10 text-rose-600",
};

export function DashboardStatCard({
    title,
    value,
    description,
    icon: Icon,
    color = "blue",
}: DashboardStatCardProps) {
    return (
        <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl",
                            colorClasses[color],
                        )}
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="mt-5 space-y-1">
                    <p className="text-sm text-muted-foreground">{title}</p>

                    <h3 className="text-3xl font-bold tracking-tight">{value}</h3>

                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
