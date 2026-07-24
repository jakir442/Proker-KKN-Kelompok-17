"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormSectionProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    children: ReactNode;
    className?: string;

    /**
     * Delay animasi (detik)
     * Contoh:
     * 0
     * 0.05
     * 0.1
     */
    delay?: number;
}

export function FormSection({
    title,
    description,
    icon: Icon,
    children,
    className,
    delay = 0,
}: FormSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                delay,
                ease: "easeOut",
            }}
            className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", className)}
        >
            <div className="border-b px-6 py-5">
                <div className="flex items-start gap-4">
                    {Icon && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                        </div>
                    )}

                    <div className="min-w-0">
                        <h2 className="text-base font-semibold tracking-tight md:text-lg">
                            {title}
                        </h2>

                        {description && (
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">{children}</div>
        </motion.section>
    );
}
