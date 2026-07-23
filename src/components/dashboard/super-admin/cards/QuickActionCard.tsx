import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuickActionCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    color?: "emerald" | "blue" | "amber" | "rose" | "violet";
}

const colorVariants = {
    emerald: {
        icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        border: "hover:border-emerald-300 dark:hover:border-emerald-700",
        glow: "from-emerald-500/10",
    },
    blue: {
        icon: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
        border: "hover:border-blue-300 dark:hover:border-blue-700",
        glow: "from-blue-500/10",
    },
    amber: {
        icon: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        border: "hover:border-amber-300 dark:hover:border-amber-700",
        glow: "from-amber-500/10",
    },
    rose: {
        icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
        border: "hover:border-rose-300 dark:hover:border-rose-700",
        glow: "from-rose-500/10",
    },
    violet: {
        icon: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
        border: "hover:border-violet-300 dark:hover:border-violet-700",
        glow: "from-violet-500/10",
    },
} as const;

export function QuickActionCard({
    title,
    description,
    href,
    icon: Icon,
    color = "emerald",
}: QuickActionCardProps) {
    const styles = colorVariants[color];

    return (
        <Link
            href={href}
            className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            <div
                className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5",
                    "shadow-sm transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:shadow-xl",
                    styles.border,
                )}
            >
                {/* Background Glow */}
                <div
                    className={cn(
                        "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        styles.glow,
                    )}
                />

                <div className="relative flex h-full flex-col">
                    {/* Icon */}
                    <div
                        className={cn(
                            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
                            "transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                            styles.icon,
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-base font-semibold tracking-tight">{title}</h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                        <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                            Buka Modul
                        </span>

                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
