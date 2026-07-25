"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TableToolbarProps {
    children: React.ReactNode;
    className?: string;
}

export function TableToolbar({
    children,
    className,
}: TableToolbarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
                "flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-xs",
                "lg:flex-row lg:items-center lg:justify-between",
                className
            )}
        >
            {children}
        </motion.div>
    );
}