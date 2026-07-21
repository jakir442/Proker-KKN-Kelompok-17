import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Home, BellRing } from "lucide-react";
import { Container } from "@/components/public/layout/Container";
import { AnnouncementDetail } from "@/components/public/announcements/AnnouncementDetail";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/public/announcements/ReadingProgress";
import { RelatedAnnouncements } from "@/components/public/announcements/RelatedAnnouncements";
import {
    findAnnouncementBySlug,
    findRelatedAnnouncements,
    findPreviousAnnouncement,
    findNextAnnouncement,
    findAllPublishedAnnouncementSlugs,
} from "@/repositories/announcement.repository";
import { PreviousNextAnnouncement } from "@/components/public/announcements/PreviousNextAnnouncement";
import type { Metadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

const SITE_URL = "https://cintanagara-smart-village.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const announcement = await findAnnouncementBySlug(slug);

    if (!announcement) {
        return {
            title: "Pengumuman tidak ditemukan",
        };
    }

    const publishedAt = (announcement.publishedAt ?? announcement.createdAt).toISOString();
    return {
        title: `${announcement.title} | Pengumuman Desa Cintanagara`,
        description: announcement.excerpt,
        keywords: [
            announcement.category,
            "Pengumuman Desa",
            "Desa Cintanagara",
            "Pemerintah Desa",
            "Smart Village",
        ],

        alternates: {
            canonical: `${SITE_URL}/pengumuman/${announcement.slug}`,
        },

        openGraph: {
            type: "article",
            locale: "id_ID",
            title: announcement.title,
            description: announcement.excerpt,
            url: `${SITE_URL}/pengumuman/${announcement.slug}`,
            siteName: "Cintanagara Smart Village",
            publishedTime: publishedAt,
            images: [
                {
                    url: announcement.coverImage,
                    width: 1200,
                    height: 630,
                    alt: announcement.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: announcement.title,
            description: announcement.excerpt,
            images: [announcement.coverImage],
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function AnnouncementDetailPage({ params }: Props) {
    const { slug } = await params;
    const announcement = await findAnnouncementBySlug(slug);

    if (!announcement || !announcement.published) {
        notFound();
    }

    const related = await findRelatedAnnouncements(announcement.slug, announcement.category, 3);
    const relatedAnnouncements = related.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        coverImage: item.coverImage,
        publishedAt: (item.publishedAt ?? item.createdAt).toISOString(),
    }));

    const previous = await findPreviousAnnouncement(
        announcement.publishedAt ?? announcement.createdAt,
    );
    const next = await findNextAnnouncement(announcement.publishedAt ?? announcement.createdAt);
    const previousAnnouncement = previous
        ? {
              slug: previous.slug,
              title: previous.title,
              publishedAt: new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
              }).format(new Date(previous.publishedAt ?? previous.createdAt)),
          }
        : null;

    const nextAnnouncement = next
        ? {
              slug: next.slug,
              title: next.title,
              publishedAt: new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
              }).format(new Date(next.publishedAt ?? next.createdAt)),
          }
        : null;

    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <ReadingProgress />
            {/* Background */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary/5 via-background to-background" />
            <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        headline: announcement.title,
                        description: announcement.excerpt,
                        image: [announcement.coverImage],
                        datePublished: (
                            announcement.publishedAt ?? announcement.createdAt
                        ).toISOString(),
                        dateModified: announcement.updatedAt.toISOString(),
                        articleSection: announcement.category,
                        mainEntityOfPage: `${SITE_URL}/pengumuman/${announcement.slug}`,
                        author: {
                            "@type": "Organization",
                            name: "Pemerintah Desa Cintanagara",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Cintanagara Smart Village",
                            logo: {
                                "@type": "ImageObject",
                                url: `${SITE_URL}/logo.png`,
                            },
                        },
                    }),
                }}
            />

            {/* Breadcrumb JSON-LD */}
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
                                item: SITE_URL,
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Pengumuman",
                                item: `${SITE_URL}/pengumuman`,
                            },
                            {
                                "@type": "ListItem",
                                position: 3,
                                name: announcement.title,
                                item: `${SITE_URL}/pengumuman/${announcement.slug}`,
                            },
                        ],
                    }),
                }}
            />

            <Container className="space-y-12">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                    >
                        <Home className="h-4 w-4" />
                        Beranda
                    </Link>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                    <Link href="/pengumuman" className="transition-colors hover:text-primary">
                        Pengumuman
                    </Link>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                    <span className="max-w-[220px] truncate font-medium text-foreground md:max-w-md">
                        {announcement.title}
                    </span>
                </nav>

                {/* Header */}
                <header className="rounded-[2rem] border border-border/60 bg-gradient-to-br from-background via-background to-muted/30 p-8 shadow-sm lg:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl space-y-5">
                            <Badge className="rounded-full px-4 py-1.5">
                                <BellRing className="mr-2 h-4 w-4" />
                                Pengumuman Resmi
                            </Badge>
                            <div>
                                <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                    {announcement.title}
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                                    Informasi resmi dari Pemerintah Desa Cintanagara untuk
                                    masyarakat. Seluruh isi pengumuman berikut merupakan informasi
                                    yang telah dipublikasikan secara resmi.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/pengumuman"
                            className="group inline-flex items-center gap-2 self-start rounded-full border bg-background px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Semua Pengumuman
                        </Link>
                    </div>
                </header>

                {/* Article */}
                <AnnouncementDetail
                    title={announcement.title}
                    content={announcement.content}
                    category={announcement.category}
                    coverImage={announcement.coverImage}
                    publishedAt={(announcement.publishedAt ?? announcement.createdAt).toISOString()}
                />
                <PreviousNextAnnouncement previous={previousAnnouncement} next={nextAnnouncement} />
                <RelatedAnnouncements announcements={relatedAnnouncements} />
            </Container>
        </section>
    );
}

export async function generateStaticParams() {
    const data = await findAllPublishedAnnouncementSlugs();

    return data.map((item) => ({
        slug: item.slug,
    }));
}
