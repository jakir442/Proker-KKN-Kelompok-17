"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { fadeUpVariants, transition } from "./Motion";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function FadeUp({ children, delay = 0, className }: Props) {
    return (
        <motion.div
            className={className}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                ...transition,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
