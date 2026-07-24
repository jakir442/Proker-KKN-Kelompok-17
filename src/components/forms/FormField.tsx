"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
    children: ReactNode;

    label: string;

    htmlFor?: string;

    required?: boolean;

    helperText?: string;

    error?: string;

    className?: string;
}

export function FormField({
    children,
    label,
    htmlFor,
    required = false,
    helperText,
    error,
    className,
}: FormFieldProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("space-y-2", className)}
        >
            <div className="flex items-center gap-2">
                <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
                    {label}
                </Label>

                {required && (
                    <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
                        Wajib
                    </span>
                )}
            </div>

            {children}

            {error ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive"
                >
                    {error}
                </motion.p>
            ) : helperText ? (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            ) : null}
        </motion.div>
    );
}
