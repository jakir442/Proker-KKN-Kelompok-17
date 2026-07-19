"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { staggerVariants } from "./Motion";

interface Props {
    children: ReactNode;
    className?: string;
}

export function Stagger({ children, className }: Props) {
    return (
        <motion.div
            className={className}
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.2,
            }}
        >
            {children}
        </motion.div>
    );
}
