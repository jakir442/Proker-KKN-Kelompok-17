"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurBlobProps {
    className?: string;
    duration?: number;
    delay?: number;
}

export function BlurBlob({ className, duration = 18, delay = 0 }: BlurBlobProps) {
    return (
        <motion.div
            className={cn("absolute rounded-full blur-3xl will-change-transform", className)}
            initial={{
                opacity: 0.25,
                scale: 1,
            }}
            animate={{
                x: [0, 60, -20, 0],
                y: [0, -40, 30, 0],
                scale: [1, 1.18, 0.95, 1],
                opacity: [0.2, 0.35, 0.25, 0.2],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }}
        />
    );
}
