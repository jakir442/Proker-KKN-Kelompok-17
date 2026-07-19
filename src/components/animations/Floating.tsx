"use client";

import { motion } from "framer-motion";

export function Floating({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            animate={{
                y: [0, -8, 0],
            }}
            transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}
