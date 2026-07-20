"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeLeft, fadeRight, fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

interface AboutContentProps {
    profile: {
        headmanPhoto?: string | null;
    } | null;
    summary: string;
}

const features = [
    "Pelayanan Digital",
    "Transparansi Pemerintahan",
    "Pengembangan UMKM",
    "Potensi Wisata Desa",
];

export function AboutContent({ profile, summary }: AboutContentProps) {
    return (
        <div className="relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="grid items-center gap-16 lg:grid-cols-2"
            >
                {/* LEFT */}
                <motion.div variants={fadeRight}>
                    <motion.div
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 backdrop-blur transition-colors hover:bg-primary/5"
                    >
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Tentang Desa</span>
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        className="mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl"
                    >
                        Mengenal
                        <span className="block text-primary">Desa Cintanagara</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        {summary}
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        className="mt-8 grid gap-4 sm:grid-cols-2"
                    >
                        {features.map((item, index) => (
                            <motion.div
                                key={item}
                                variants={scaleIn}
                                className="
                                    flex items-center gap-3
                                    rounded-xl border
                                    bg-background/60
                                    p-4
                                    backdrop-blur
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/30
                                    hover:shadow-lg
                                "
                            >
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <Button
                            size="lg"
                            className="group mt-10 rounded-full px-8 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            <Link href="/profil" className="inline-flex items-center gap-2">
                                <span>Selengkapnya</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* RIGHT */}
                <motion.div variants={fadeLeft} className="relative">
                    <div className="group relative overflow-hidden rounded-[32px] border bg-muted shadow-2xl">
                        <Image
                            src={profile?.headmanPhoto || "/images/about-desa.jpg"}
                            alt="Desa Cintanagara"
                            width={900}
                            height={700}
                            className="aspect-[4/3] w-full object-cover transition duration-700 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 1, 0, -1, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -bottom-8 left-6 rounded-2xl border bg-background/90 p-5 shadow-xl backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-3">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Lokasi</p>
                                <h4 className="font-semibold">Desa Cintanagara</h4>
                                <p className="text-sm text-muted-foreground">Kecamatan Cigedug</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
