"use client";

import { cn } from "@/lib/utils";

interface TableToolbarRightProps {
    children: React.ReactNode;
    className?: string;
}

export function TableToolbarRight({
    children,
    className,
}: TableToolbarRightProps) {
    return (
        <div
            className={cn(
                "flex w-full justify-end",
                "xl:w-auto",
                className
            )}
        >
            {children}
        </div>
    );
}