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
        <header className="border-b bg-gradient-to-b from-muted/30 via-background to-background">
            <Container className="py-12 lg:py-16">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <nav
                            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                            aria-label="Breadcrumb"
                        >
                            <Link
                                href="/"
                                className="flex items-center gap-2 transition-colors hover:text-primary"
                            >
                                <Home className="size-4" />
                                Beranda
                            </Link>

                            <ChevronRight className="size-4" />

                            <Link href="/berita" className="transition-colors hover:text-primary">
                                Berita
                            </Link>
                        </nav>
                    </FadeIn>

                    <Reveal>
                        <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                            <Newspaper className="mr-2 size-4" />
                            {category}
                        </Badge>
                    </Reveal>

                    <Reveal>
                        <h1 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>
                    </Reveal>

                    <Reveal>
                        <p
                            className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground"
                            style={{ textAlign: "justify" }}
                        >
                            {excerpt}
                        </p>
                    </Reveal>

                    <Reveal>
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4" />
                                <span>{date}</span>
                            </div>

                            <div className="hidden h-4 w-px bg-border sm:block" />

                            <div className="flex items-center gap-2">
                                <Clock3 className="size-4" />
                                <span>{readingTime}</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="mt-10 overflow-hidden rounded-3xl border bg-muted shadow-xl">
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    priority
                                    sizes="(max-width:768px) 100vw, 900px"
                                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </header>
    );
}
