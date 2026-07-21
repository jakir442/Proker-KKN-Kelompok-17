import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Home, Newspaper } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "../layout/Container";

interface NewsDetailHeroProps {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readingTime?: string;
}

export function NewsDetailHero({
    title,
    excerpt,
    image,
    category,
    date,
    readingTime = "5 menit membaca",
}: NewsDetailHeroProps) {
    return (
        <header className="relative overflow-hidden">
            <div className="relative h-[420px] sm:h-[520px] lg:h-[640px]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    sizes="100vw"
                    className="animate-[kenburns_20s_ease-out_forwards] object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/15" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                {/* Decorations */}
                <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

                <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-400/20 blur-[120px]" />

                <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

                <Container className="relative flex h-full items-end pb-12 sm:pb-16 lg:pb-20">
                    <div className="max-w-5xl text-white">
                        <FadeIn>
                            <nav
                                aria-label="Breadcrumb"
                                className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/80"
                            >
                                <Link href="/" className="transition hover:text-white">
                                    <Home className="h-4 w-4" />
                                </Link>

                                <ChevronRight className="h-4 w-4 opacity-60" />

                                <Link href="/berita" className="transition hover:text-white">
                                    Berita
                                </Link>

                                <ChevronRight className="h-4 w-4 opacity-60" />

                                <span className="line-clamp-1 text-white">{title}</span>
                            </nav>
                        </FadeIn>

                        <Reveal>
                            <Badge className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur-md">
                                <Newspaper className="mr-2 h-4 w-4" />
                                {category}
                            </Badge>
                        </Reveal>

                        <Reveal>
                            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                                {title}
                            </h1>
                        </Reveal>

                        <Reveal>
                            <p className="mt-6 max-w-3xl text-base leading-8 text-white/90 sm:text-lg lg:text-xl">
                                {excerpt}
                            </p>
                        </Reveal>

                        <Reveal>
                            <div className="mt-10 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl">
                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-4 w-4 text-primary-foreground" />
                                    <span>{date}</span>
                                </div>

                                <div className="hidden h-5 w-px bg-white/20 sm:block" />

                                <div className="flex items-center gap-2 text-sm">
                                    <Clock3 className="h-4 w-4 text-primary-foreground" />
                                    <span>{readingTime}</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </div>
        </header>
    );
}
