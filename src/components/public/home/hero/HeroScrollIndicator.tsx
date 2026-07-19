"use client";

import { motion } from "framer-motion";

export function HeroScrollIndicator() {
    return (
        <div className="mt-14 hidden items-center gap-3 text-white/70 md:flex">
            <div className="flex h-12 w-7 justify-center rounded-full border border-white/20 p-1">
                <motion.div
                    animate={{ y: [0, 14, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="h-2 w-2 rounded-full bg-white"
                />
            </div>

            <span className="text-sm">Scroll untuk menjelajahi</span>
        </div>
    );
}
