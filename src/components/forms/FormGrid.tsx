"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormGridProps {
    children: ReactNode;
    className?: string;
    columns?: 1 | 2 | 3;
}

const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
};

export function FormGrid({ children, className, columns = 2 }: FormGridProps) {
    return <div className={cn("grid gap-6", gridColumns[columns], className)}>{children}</div>;
}
