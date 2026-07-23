import type { ReactNode } from "react";

interface DashboardHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export function DashboardHeader({
    title,
    description,
    action,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="flex shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}