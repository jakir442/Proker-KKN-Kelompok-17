"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";

export function MobileMenuFooter() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.35,
                duration: 0.3,
            }}
            className="border-t bg-muted/20 px-6 py-5"
        >
            <div className="space-y-3">
                {/* App Info */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        Cintanagara Smart Village
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Platform digital untuk pelayanan publik, transparansi, dan informasi Desa
                        Cintanagara.
                    </p>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/70 px-3 py-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="size-4 text-emerald-500" />
                        <span>Sistem Aman</span>
                    </div>

                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        v1.0.0
                    </span>
                </div>

                {/* Copyright */}
                <div className="flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
                    <span>© 2026 Dibuat dengan</span>

                    <Heart className="size-3 fill-red-500 text-red-500" />

                    <span>untuk Desa Cintanagara</span>
                </div>
            </div>
        </motion.footer>
    );
}
