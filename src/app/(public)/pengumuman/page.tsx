import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { AnnouncementList } from "@/components/public/announcements/AnnouncementList";
import { findPublishedAnnouncements } from "@/repositories/announcement.repository";

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

    return (
        <section className="py-20">
            <Container>
                <SectionHeader
                    badge="Pengumuman"
                    title="Pengumuman Desa"
                    description="Informasi resmi Pemerintah Desa Cintanagara."
                />

                <div className="mt-12">
                    <AnnouncementList announcements={data} />
                </div>
            </Container>
        </section>
    );
}
