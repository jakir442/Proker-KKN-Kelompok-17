import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SettingsCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

export function SettingsCard({ title, description, icon: Icon, href }: SettingsCardProps) {
    return (
        <Link
            href={href}
            className="group block rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
            <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            <div className="mt-5 space-y-1.5">
                <h2 className="text-base font-semibold tracking-tight">{title}</h2>

                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
        </Link>
    );
}
