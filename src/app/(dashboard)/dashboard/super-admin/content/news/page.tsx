import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { NewsDialog } from "@/components/dashboard/super-admin/news/news-dialog";
import { NewsTable } from "@/components/dashboard/super-admin/news/news-table";
import { getAllNews } from "@/repositories/news.repository";

export default async function NewsPage() {
    const news = await getAllNews();

    const data = news.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        category: item.category,
        published: item.published,
        createdAt: item.createdAt.toISOString(),
    }));

    return (
        <div className="space-y-8">
            <SectionHeader title="Manajemen Berita" description="Kelola berita Desa Cintanagara.">
                <NewsDialog />
            </SectionHeader>
            <NewsTable data={data} />
        </div>
    );
}
