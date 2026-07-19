import Link from "next/link";

import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { StatCardProps } from "../types";

const colorVariants = {
    emerald: {
        icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        border: "hover:border-emerald-300 dark:hover:border-emerald-700",
        glow: "bg-emerald-500/10",
    },
    blue: {
        icon: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
        border: "hover:border-blue-300 dark:hover:border-blue-700",
        glow: "bg-blue-500/10",
    },
    amber: {
        icon: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        border: "hover:border-amber-300 dark:hover:border-amber-700",
        glow: "bg-amber-500/10",
    },
    rose: {
        icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
        border: "hover:border-rose-300 dark:hover:border-rose-700",
        glow: "bg-rose-500/10",
    },
    violet: {
        icon: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
        border: "hover:border-violet-300 dark:hover:border-violet-700",
        glow: "bg-violet-500/10",
    },
} as const;

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendLabel,
    color = "emerald",
    href,
}: StatCardProps) {
    const isPositive = trend?.startsWith("+");

    const styles = colorVariants[color];

    const content = (
        <div
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6",
                "shadow-sm transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:shadow-xl",
                styles.border,
            )}
        >
            {/* Glow */}
            <div
                className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl",
                    styles.glow,
                )}
            />

            <div className="relative flex h-full flex-col">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>

                        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                    </div>

                    <div
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl",
                            "transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                            styles.icon,
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </div>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>

                {/* Trend */}
                {trend && (
                    <div className="mt-5 flex items-center gap-2">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                                isPositive
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
                            )}
                        >
                            {isPositive ? (
                                <TrendingUp className="h-3.5 w-3.5" />
                            ) : (
                                <TrendingDown className="h-3.5 w-3.5" />
                            )}

                            {trend}
                        </span>

                        {trendLabel && (
                            <span className="text-xs text-muted-foreground">{trendLabel}</span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <span className="text-xs text-muted-foreground">Diperbarui hari ini</span>

                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    );

    if (!href) {
        return content;
    }

    return (
        <Link
            href={href}
            className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            {content}
        </Link>
    );
}
