import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BellRing, CalendarDays, Newspaper } from "lucide-react";

import { Container } from "@/components/public/layout/Container";
import { AnnouncementList } from "@/components/public/announcements/AnnouncementList";
import { Badge } from "@/components/ui/badge";
import { findPublishedAnnouncements } from "@/repositories/announcement.repository";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengumuman Desa Cintanagara",
    description:
        "Kumpulan pengumuman resmi Pemerintah Desa Cintanagara. Informasi terbaru mengenai kegiatan, kebijakan, pelayanan, dan pemberitahuan desa.",

    keywords: [
        "Pengumuman Desa",
        "Desa Cintanagara",
        "Smart Village",
        "Pemerintah Desa",
        "Informasi Desa",
    ],

    alternates: {
        canonical: "https://cintanagara-smart-village.vercel.app/pengumuman",
    },

    openGraph: {
        type: "website",
        locale: "id_ID",
        url: "https://cintanagara-smart-village.vercel.app/pengumuman",
        title: "Pengumuman Desa Cintanagara",
        description: "Kumpulan pengumuman resmi Pemerintah Desa Cintanagara.",
        siteName: "Cintanagara Smart Village",
        images: [
            {
                url: "https://cintanagara-smart-village.vercel.app/og-pengumuman.jpg",
                width: 1200,
                height: 630,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Pengumuman Desa Cintanagara",
        description: "Kumpulan pengumuman resmi Pemerintah Desa Cintanagara.",
        images: ["https://cintanagara-smart-village.vercel.app/og-pengumuman.jpg"],
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default async function AnnouncementPage() {
    const announcements = await findPublishedAnnouncements(100);
    const data = announcements.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        coverImage: item.coverImage,
        publishedAt: (item.publishedAt ?? item.createdAt).toISOString(),
    }));

    const featured = data[0];

    return (
        <section className="relative overflow-hidden py-24">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Pengumuman Desa Cintanagara",
                        description: "Kumpulan pengumuman resmi Pemerintah Desa Cintanagara.",
                        url: "https://cintanagara-smart-village.vercel.app/pengumuman",
                        isPartOf: {
                            "@type": "WebSite",
                            name: "Cintanagara Smart Village",
                            url: "https://cintanagara-smart-village.vercel.app",
                        },
                    }),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Beranda",
                                item: "https://cintanagara-smart-village.vercel.app",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Pengumuman",
                                item: "https://cintanagara-smart-village.vercel.app/pengumuman",
                            },
                        ],
                    }),
                }}
            />

            <Container className="space-y-20">
                {/* HERO */}
                <header className="mx-auto max-w-4xl text-center">
                    <Badge className="rounded-full px-4 py-1.5">
                        <BellRing className="mr-2 h-4 w-4" />
                        Informasi Resmi
                    </Badge>
                    <h1 className="mt-8 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
                        Pengumuman Desa Cintanagara
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Temukan seluruh informasi resmi, pemberitahuan penting, serta kebijakan
                        terbaru dari Pemerintah Desa Cintanagara.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <div className="rounded-2xl border bg-background px-6 py-4 shadow-sm">
                            <div className="text-2xl font-bold">{data.length}</div>
                            <div className="text-sm text-muted-foreground">Pengumuman</div>
                        </div>
                        <div className="rounded-2xl border bg-background px-6 py-4 shadow-sm">
                            <div className="text-2xl font-bold">Resmi</div>
                            <div className="text-sm text-muted-foreground">Informasi</div>
                        </div>
                        <div className="rounded-2xl border bg-background px-6 py-4 shadow-sm">
                            <div className="text-2xl font-bold">24/7</div>
                            <div className="text-sm text-muted-foreground">Akses Online</div>
                        </div>
                    </div>
                </header>

                {/* Featured */}
                {featured && (
                    <section className="overflow-hidden rounded-3xl border bg-card shadow-xl">
                        <div className="grid lg:grid-cols-2">
                            <div className="relative aspect-[16/10] lg:aspect-auto">
                                <Image
                                    src={featured.coverImage}
                                    alt={featured.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-center p-8 lg:p-12">
                                <Badge variant="secondary" className="w-fit rounded-full">
                                    Pengumuman Terbaru
                                </Badge>
                                <h2 className="mt-6 text-3xl font-bold leading-tight">
                                    {featured.title}
                                </h2>
                                <p className="mt-5 leading-8 text-muted-foreground">
                                    {featured.excerpt}
                                </p>
                                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    {new Intl.DateTimeFormat("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(featured.publishedAt))}
                                </div>
                                <Link
                                    href={`/pengumuman/${featured.slug}`}
                                    className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-[1.02]"
                                >
                                    Baca Pengumuman
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Heading */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-3 text-3xl font-bold">
                            <Newspaper className="h-7 w-7 text-primary" />
                            Semua Pengumuman
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Seluruh pengumuman resmi yang telah dipublikasikan.
                        </p>
                    </div>

                    <Badge variant="outline" className="hidden rounded-full px-4 py-2 md:flex">
                        {data.length} Informasi
                    </Badge>
                </div>

                {/* Grid */}
                <AnnouncementList announcements={data} />
            </Container>
        </section>
    );
}
