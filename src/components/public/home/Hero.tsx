import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/public/layout/Container";
import { Stats } from "./Stats";
import { SITE } from "@/constants/site";

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] items-center overflow-hidden">
            <Image
                src="/images/hero-desa.jpg"
                alt="Desa Cintanagara"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/40" />

            <Container className="relative z-10 mt-5">
                <div className="max-w-3xl text-white">
                    <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium">
                        🌿 WEBSITE RESMI {SITE.name}
                    </span>

                    <h1 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
                        Website Digital
                        <span className="block text-emerald-400">{SITE.name}</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-200">
                        Portal informasi resmi yang menghadirkan berita desa, profil pemerintahan,
                        UMKM lokal, wisata, dan layanan digital untuk masyarakat Desa Cintanagara.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button size="lg">
                            <Link href="/profil">
                                Tentang Desa
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white bg-transparent text-white hover:bg-white hover:text-slate-900"
                        >
                            <Link href="/berita">
                                <Info className="mr-2 h-4 w-4" />
                                Berita Desa
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-16 flex items-center gap-2 text-slate-300">
                        <ChevronDown className="animate-bounce" />
                        Scroll untuk melihat informasi
                    </div>
                </div>

                <Stats />
            </Container>
        </section>
    );
}
