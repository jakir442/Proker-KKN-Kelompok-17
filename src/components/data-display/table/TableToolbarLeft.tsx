"use client";

import { cn } from "@/lib/utils";

interface TableToolbarLeftProps {
    children: React.ReactNode;
    className?: string;
}

export function TableToolbarLeft({
    children,
    className,
}: TableToolbarLeftProps) {
    return (
        <div
            className={cn(
                "flex flex-1 flex-col gap-3",
                "sm:flex-row sm:flex-wrap sm:items-center",
                className
            )}
        >
            {children}
        </div>
    );
}