"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface FormHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    className?: string;
}

export function FormHeader({ title, description, icon: Icon, className }: FormHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className={cn("space-y-4 pb-6 border-b", className)}
        >
            <div className="flex items-start gap-4">
                {Icon && (
                    <div
                        className="
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-2xl border bg-primary/5 text-primary
        "
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <h1
                        className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-foreground
                        sm:text-3xl
                    "
                    >
                        {title}
                    </h1>

                    {description && (
                        <p
                            className="
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-relaxed
                            text-muted-foreground
                            sm:text-base
                        "
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
