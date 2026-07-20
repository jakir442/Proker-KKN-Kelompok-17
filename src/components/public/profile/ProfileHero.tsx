"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface ProfileHeroProps {
    title: string;
    description: string;
    image?: string;
}

export function ProfileHero({
    title,
    description,
    image = "/images/about-desa.jpg",
}: ProfileHeroProps) {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border bg-muted shadow-xl">
            {/* Background */}
            <div className="relative h-[500px] md:h-[580px]">
                <Image src={image} alt={title} fill priority className="object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                {/* Decorative Blur */}
                <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 flex items-end"
                >
                    <div className="w-full p-8 md:p-14 lg:p-16">
                        <motion.div variants={fadeUp}>
                            <Badge className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur-md">
                                <Sparkles className="mr-2 h-3.5 w-3.5" />
                                Profil Desa
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap items-center gap-4"
                        >
                            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                                <MapPin className="h-4 w-4 text-primary" />
                                Kecamatan Cigedug • Kabupaten Garut
                            </div>

                            <div className="rounded-full border border-emerald-400/20 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-md">
                                Smart Village 2026
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                >
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                    >
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
