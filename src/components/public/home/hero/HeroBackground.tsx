"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { BlurBlob } from "@/components/animations";

export function HeroBackground() {
    return (
        <>
            {/* Animated Background Image */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <Image
                    src="/images/hero-desa.jpg"
                    alt="Desa Cintanagara"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

            {/* Aurora */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,.18),transparent_32%),radial-gradient(circle_at_bottom_center,rgba(6,182,212,.12),transparent_35%)]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

            {/* Decorative Blobs */}
            <BlurBlob className="left-[-180px] top-10 h-[420px] w-[420px] bg-emerald-500/25" />

            <BlurBlob
                className="right-[-160px] top-0 h-[360px] w-[360px] bg-sky-400/20"
                duration={22}
            />

            <BlurBlob
                className="bottom-[-140px] left-1/3 h-[280px] w-[280px] bg-cyan-400/15"
                duration={18}
                delay={2}
            />

            {/* Bottom Vignette */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </>
    );
}
