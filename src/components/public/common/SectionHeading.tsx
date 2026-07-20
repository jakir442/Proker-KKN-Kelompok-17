import { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
    badge: string;
    title: string;
    highlight?: string;
    description: string;
    number?: string;
    icon?: LucideIcon;
    align?: "left" | "center";
}

export function SectionHeading({
    badge,
    title,
    highlight,
    description,
    number,
    icon: Icon,
    align = "left",
}: SectionHeadingProps) {
    return (
        <div className="relative">
            {number && (
                <span className="pointer-events-none absolute right-0 top-0 -z-10 text-8xl font-black tracking-tight text-primary/5 md:text-9xl">
                    {number}
                </span>
            )}

            <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
                <Badge variant="secondary" className="rounded-full px-4 py-1">
                    {Icon && <Icon className="mr-2 h-3.5 w-3.5" />}
                    {badge}
                </Badge>

                <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                    {title}

                    {highlight && <span className="mt-1 block text-primary">{highlight}</span>}
                </h2>

                <p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
