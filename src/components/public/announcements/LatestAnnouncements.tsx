import Link from "next/link";

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
        <section className="py-20">
            <Container>
                <SectionHeader
                    badge="Pengumuman"
                    title="Pengumuman Terbaru"
                    description="Informasi resmi dan pengumuman terbaru dari Pemerintah Desa Cintanagara."
                />

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((announcement) => (
                        <AnnouncementCard key={announcement.slug} {...announcement} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/pengumuman"
                        className="font-medium text-primary transition hover:underline"
                    >
                        Lihat Semua Pengumuman →
                    </Link>
                </div>
            </Container>
        </section>
    );
}
