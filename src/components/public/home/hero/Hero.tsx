"use client";

import { Container } from "@/components/public/layout/Container";

import { HeroAurora } from "./HeroAurora";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";
import { HeroStatistics } from "@/repositories/hero.repository";

interface HeroProps {
    stats: HeroStatistics;
}

export function Hero({ stats }: HeroProps) {
    return (
        <section className="relative overflow-hidden">
            <div className="relative flex min-h-screen items-center">
                <HeroBackground />

                <HeroAurora />

                <Container className="relative z-10 py-16 lg:py-20">
                    <HeroContent />

                    <HeroStats stats={stats} />
                </Container>
            </div>
        </section>
    );
}
