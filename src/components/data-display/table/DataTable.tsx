"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
    children: ReactNode;

    title?: string;
    description?: string;

    toolbar?: ReactNode;
    footer?: ReactNode;

    className?: string;
    contentClassName?: string;

    stickyHeader?: boolean;
}

export function DataTable({
    children,
    title,
    description,
    toolbar,
    footer,
    className,
    contentClassName,
    stickyHeader = false,
}: DataTableProps) {
    return (
        <section
            className={cn(
                "overflow-hidden rounded-2xl border bg-card shadow-sm",
                className
            )}
        >
            {(title || description) && (
                <header className="border-b px-5 py-5 sm:px-6">
                    {title && (
                        <h2 className="text-lg font-semibold tracking-tight">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </header>
            )}

            {toolbar && (
                <div className="border-b bg-muted/20 px-5 py-4 sm:px-6">
                    {toolbar}
                </div>
            )}

            <div className="p-5 sm:p-6">
                <div
                    className={cn(
                        "overflow-hidden rounded-xl border bg-background",
                        stickyHeader && "max-h-[70dvh]"
                    )}
                >
                    <div
                        className={cn(
                            "overflow-x-auto",
                            stickyHeader && "overflow-auto",
                            contentClassName
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>

            {footer && (
                <footer className="border-t bg-muted/20 px-5 py-4 sm:px-6">
                    {footer}
                </footer>
            )}
        </section>
    );
}