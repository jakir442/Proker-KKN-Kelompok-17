"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            const scrollTop = window.scrollY;

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            const percentage =
                scrollHeight <= 0 ? 0 : Math.min(100, (scrollTop / scrollHeight) * 100);

            setProgress(percentage);

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        updateProgress();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <div
            className={`fixed inset-x-0 top-0 z-[9999] h-1 overflow-hidden transition-opacity duration-300 ${
                progress > 0 ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
        >
            {/* Background */}
            <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />

            {/* Glow */}
            <div
                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-primary via-sky-500 to-emerald-500 shadow-[0_0_18px_rgba(16,185,129,.6)]"
                style={{
                    transform: `scaleX(${progress / 100})`,
                }}
            />

            {/* Progress Dot */}
            <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-lg ring-2 ring-primary transition-transform duration-150"
                style={{
                    left: `calc(${progress}% - 6px)`,
                    opacity: progress > 2 ? 1 : 0,
                }}
            />
        </div>
    );
}
