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
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-20 lg:py-24">
            <div className="absolute right-0 top-0 hidden h-72 w-72 rounded-full bg-primary/5 blur-3xl lg:block" />

            <Container className="relative">
                <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <SectionHeader
                            badge="Pengumuman"
                            title="Pengumuman Terbaru"
                            description="Informasi resmi, pemberitahuan penting, dan kebijakan terbaru dari Pemerintah Desa Cintanagara untuk seluruh masyarakat."
                        />
                    </div>

                    <Link
                        href="/pengumuman"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full border bg-background px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md sm:w-fit"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 xl:grid-cols-3">
                    {data.map((announcement) => (
                        <AnnouncementCard key={announcement.slug} {...announcement} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
