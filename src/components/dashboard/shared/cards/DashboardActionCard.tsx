import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardActionCardProps {
    title: string;
    description: string;
    href: string;
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

export function DashboardActionCard({
    title,
    description,
    href,
    icon: Icon,
    color = "blue",
}: DashboardActionCardProps) {
    return (
        <Link href={href}>
            <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                        <div
                            className={cn(
                                "flex h-11 w-11 items-center justify-center rounded-xl",
                                colorClasses[color],
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </div>

                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>

                    <div className="mt-5 space-y-2">
                        <h3 className="font-semibold tracking-tight">{title}</h3>

                        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
