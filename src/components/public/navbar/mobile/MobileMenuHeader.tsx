"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Logo } from "../../common/Logo";

export function MobileMenuHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className="border-b bg-gradient-to-b from-primary/5 via-background to-background"
        >
            <div className="flex flex-col items-center px-6 py-8 text-center">
                <div className="rounded-2xl border border-primary/10 bg-background p-3 shadow-sm">
                    <Logo />
                </div>

                <h2 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                    Cintanagara Smart Village
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">Digital Government Platform</p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="size-3.5" />

                    <span>Modern • Transparan • Melayani</span>
                </div>
            </div>
        </motion.div>
    );
}
