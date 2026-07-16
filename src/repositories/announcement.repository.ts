import { connectDB } from "@/lib/mongodb";
import { Announcement, IAnnouncement } from "@/models/announcement";

interface FindAllAnnouncementsOptions {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    published?: boolean;
}

export async function createAnnouncement(data: Partial<IAnnouncement>): Promise<IAnnouncement> {
    await connectDB();

    const announcement = await Announcement.create(data);

    return announcement;
}

export async function updateAnnouncement(
    id: string,
    data: Partial<IAnnouncement>,
): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

export async function deleteAnnouncement(id: string): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findByIdAndDelete(id);
}

export async function findAnnouncementById(id: string): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findById(id);
}

export async function findAnnouncementBySlug(slug: string): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findOne({ slug });
}

export async function findAnnouncements({
    page = 1,
    limit = 10,
    search = "",
    category,
    published,
}: FindAllAnnouncementsOptions) {
    await connectDB();

    const query: Record<string, unknown> = {};

    if (search) {
        query.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                excerpt: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (category) {
        query.category = category;
    }

    if (published !== undefined) {
        query.published = published;
    }

    const total = await Announcement.countDocuments(query);

    const announcements = await Announcement.find(query)

        .sort({
            createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        announcements,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}

export async function findPublishedAnnouncements(limit = 6): Promise<IAnnouncement[]> {
    await connectDB();

    return Announcement.find({
        published: true,
    })
        .sort({
            publishedAt: -1,
        })
        .limit(limit);
}
