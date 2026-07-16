export interface AnnouncementTableData {
    id: string;

    title: string;
    slug: string;

    excerpt: string;

    content: string; // <- tambahkan

    coverImage: string;

    category: string;

    published: boolean;

    publishedAt: string | null;

    createdAt: string;
    updatedAt: string;
}
