"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { fadeVariants, transition } from "./Motion";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function FadeIn({ children, delay = 0, className }: Props) {
    return (
        <motion.div
            className={className}
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
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
