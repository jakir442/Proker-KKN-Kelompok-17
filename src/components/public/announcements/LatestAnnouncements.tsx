import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "../common/SectionHeader";
import { Container } from "../layout/Container";

import { findPublishedAnnouncements } from "@/repositories/announcement.repository";
import { AnnouncementCard } from "./AnnouncementCard";

export async function LatestAnnouncements() {
    const announcements = await findPublishedAnnouncements(3);

    const data = announcements.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        coverImage: item.coverImage,
        publishedAt: (item.publishedAt ?? item.createdAt).toISOString(),
    }));

    if (data.length === 0) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-24">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <Container className="relative">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeader
                        badge="Pengumuman"
                        title="Pengumuman Terbaru"
                        description="Informasi resmi, pemberitahuan penting, dan kebijakan terbaru dari Pemerintah Desa Cintanagara untuk seluruh masyarakat."
                    />

                    <Link
                        href="/pengumuman"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border bg-background px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {data.map((announcement) => (
                        <AnnouncementCard key={announcement.slug} {...announcement} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
