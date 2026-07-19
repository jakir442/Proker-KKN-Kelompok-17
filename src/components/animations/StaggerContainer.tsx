"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export function StaggerContainer({ children, className }: Props) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.12,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
