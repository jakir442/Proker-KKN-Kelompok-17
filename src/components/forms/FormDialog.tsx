"use client";

import type { ReactNode } from "react";

import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FormDialogProps {
    children: ReactNode;
    className?: string;
}

export function FormDialog({ children, className }: FormDialogProps) {
    return (
        <DialogContent
            className={cn(
                "flex h-[95dvh] w-[96vw] max-w-none flex-col overflow-hidden rounded-2xl p-0 sm:h-auto sm:max-h-[92dvh] sm:w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-5xl",
                className,
            )}
        >
            <div
                data-form-scroll
                className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 xl:px-8 xl:py-8"
            >
                {children}
            </div>
        </DialogContent>
    );
}
