import { connectDB } from "@/lib/mongodb";
import { Announcement, IAnnouncement } from "@/models/announcement";

interface FindAllAnnouncementsOptions {
    page?: number;
    limit?: number;
    search?: string;
    category?: IAnnouncement["category"];
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

export async function findRelatedAnnouncements(
    slug: string,
    category: IAnnouncement["category"],
    limit = 3,
): Promise<IAnnouncement[]> {
    await connectDB();

    const related = await Announcement.find({
        published: true,
        slug: { $ne: slug },
        category,
    })
        .sort({
            publishedAt: -1,
        })
        .limit(limit);

    if (related.length >= limit) {
        return related;
    }

    const remaining = limit - related.length;

    const fallback = await Announcement.find({
        published: true,
        slug: { $ne: slug },
        _id: {
            $nin: related.map((item) => item._id),
        },
    })
        .sort({
            publishedAt: -1,
        })
        .limit(remaining);

    return [...related, ...fallback];
}

export async function findPreviousAnnouncement(publishedAt: Date): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findOne({
        published: true,
        publishedAt: {
            $lt: publishedAt,
        },
    }).sort({
        publishedAt: -1,
    });
}

export async function findNextAnnouncement(publishedAt: Date): Promise<IAnnouncement | null> {
    await connectDB();

    return Announcement.findOne({
        published: true,
        publishedAt: {
            $gt: publishedAt,
        },
    }).sort({
        publishedAt: 1,
    });
}

export async function countPublishedAnnouncements(): Promise<number> {
    await connectDB();

    return Announcement.countDocuments({
        published: true,
    });
}

export async function findAnnouncementCategories() {
    await connectDB();

    return Announcement.distinct("category", {
        published: true,
    });
}

export async function findAllPublishedAnnouncementSlugs() {
    await connectDB();

    return Announcement.find(
        {
            published: true,
        },
        {
            slug: 1,
            _id: 0,
        },
    ).lean();
}
