"use client";

import { CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/animations";

const items = ["Pelayanan Digital", "Transparansi APBDes", "UMKM Lokal", "Wisata Desa"];

export function HeroHighlights() {
    return (
        <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4">
            {items.map((item, index) => (
                <FadeUp key={item} delay={0.5 + index * 0.1}>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm font-medium text-white">{item}</span>
                    </div>
                </FadeUp>
            ))}
        </div>
    );
}
