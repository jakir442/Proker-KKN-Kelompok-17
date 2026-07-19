"use client";

import { motion } from "framer-motion";

export function HeroAurora() {
    return (
        <>
            <motion.div
                className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
                animate={{
                    x: [0, 40, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </>
    );
}
