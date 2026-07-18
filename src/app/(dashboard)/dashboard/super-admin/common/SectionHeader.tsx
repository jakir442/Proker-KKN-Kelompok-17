import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
    return (
        <div className="mb-6 flex items-start justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {description && <p className="mt-1 text-muted-foreground">{description}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
