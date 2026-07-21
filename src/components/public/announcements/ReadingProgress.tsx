"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage =
                documentHeight > 0 ? Math.min((scrollTop / documentHeight) * 100, 100) : 0;
            setProgress(percentage);
        };
        updateProgress();
        window.addEventListener("scroll", updateProgress, {
            passive: true,
        });

        window.addEventListener("resize", updateProgress);
        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <div className="fixed inset-x-0 top-0 z-[100] h-[3px]">
            <motion.div
                className="h-full origin-left rounded-r-full bg-gradient-to-r from-primary via-primary to-sky-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                style={{
                    width: `${progress}%`,
                }}
                transition={{
                    duration: 0.12,
                    ease: "easeOut",
                }}
            />
        </div>
    );
}
