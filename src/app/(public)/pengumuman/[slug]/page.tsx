import { notFound } from "next/navigation";

import { Container } from "@/components/public/layout/Container";
import { AnnouncementDetail } from "@/components/public/announcements/AnnouncementDetail";

import { findAnnouncementBySlug } from "@/repositories/announcement.repository";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function AnnouncementDetailPage({ params }: Props) {
    const { slug } = await params;

    const announcement = await findAnnouncementBySlug(slug);

    if (!announcement || !announcement.published) {
        notFound();
    }

    return (
        <section className="py-20">
            <Container>
                <AnnouncementDetail
                    title={announcement.title}
                    content={announcement.content}
                    category={announcement.category}
                    coverImage={announcement.coverImage}
                    publishedAt={(announcement.publishedAt ?? announcement.createdAt).toISOString()}
                />
            </Container>
        </section>
    );
}
