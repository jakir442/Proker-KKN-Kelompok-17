import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export function SectionHeader({ title, description, children }: SectionHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

                {description && <p className="text-muted-foreground">{description}</p>}
            </div>

            {children && <div className="flex items-center gap-2">{children}</div>}
        </div>
    );
}
