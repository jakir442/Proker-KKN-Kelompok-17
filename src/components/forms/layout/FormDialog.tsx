"use client";

import type { ReactNode } from "react";

import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const dialogSizes = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg",
    lg: "sm:max-w-xl",
    xl: "sm:max-w-2xl",
    "2xl": "sm:max-w-3xl",
    "3xl": "sm:max-w-4xl",
    "4xl": "sm:max-w-5xl",
    "5xl": "sm:max-w-6xl",
    full: "sm:max-w-[95vw]",
} as const;

type DialogSize = keyof typeof dialogSizes;

interface FormDialogProps {
    children: ReactNode;
    size?: DialogSize;
    className?: string;
}

export function FormDialog({ children, className, size = "3xl" }: FormDialogProps) {
    return (
        <DialogContent
            className={cn(
                "flex h-[95dvh] w-[96vw] max-w-none flex-col overflow-hidden rounded-2xl p-0 sm:h-auto sm:max-h-[92dvh]",
                dialogSizes[size],
                className,
            )}
        >
            <div data-form-scroll className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </DialogContent>
    );
}
