import { connectDB } from "@/lib/mongodb";
import { News, INews } from "@/models/news";

export async function getLatestNews(limit = 3): Promise<INews[]> {
    await connectDB();
    return (await News.find({ published: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean()) as INews[];
}

export async function getAllNews(): Promise<INews[]> {
    await connectDB();
    return (await News.find().sort({ createdAt: -1 }).lean()) as INews[];
}

export async function createNews(data: Partial<INews>): Promise<INews> {
    await connectDB();
    const news = await News.create(data);
    return news.toObject() as INews;
}

export async function findNewsBySlug(slug: string): Promise<INews | null> {
    await connectDB();
    return (await News.findOne({
        slug,
        published: true,
    }).lean()) as INews | null;
}

export async function getNewsById(id: string): Promise<INews | null> {
    await connectDB();
    return (await News.findById(id).lean()) as INews | null;
}

export async function updateNews(id: string, data: Partial<INews>): Promise<INews | null> {
    await connectDB();

    return News.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).lean<INews>();
}

export async function deleteNews(id: string): Promise<void> {
    await connectDB();

    await News.findByIdAndDelete(id);
}

export async function updateNewsStatus(id: string, published: boolean) {
    await connectDB();

    return News.findByIdAndUpdate(
        id,
        {
            published,
        },
        {
            new: true,
        },
    );
}

export async function getRelatedNews(currentId: string, category: string, limit = 3) {
    await connectDB();

    let news = await News.find({
        _id: { $ne: currentId },
        category,
        published: true,
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    if (news.length < limit) {
        const excludeIds = [currentId, ...news.map((item) => item._id.toString())];

        const fallback = await News.find({
            _id: {
                $nin: excludeIds,
            },
            published: true,
        })
            .sort({ createdAt: -1 })
            .limit(limit - news.length)
            .lean();

        news = [...news, ...fallback];
    }

    return news;
}

export async function getNewsNavigation(currentCreatedAt: Date) {
    await connectDB();

    const previous = await News.findOne({
        published: true,
        createdAt: {
            $lt: currentCreatedAt,
        },
    })
        .sort({ createdAt: -1 })
        .lean();

    const next = await News.findOne({
        published: true,
        createdAt: {
            $gt: currentCreatedAt,
        },
    })
        .sort({ createdAt: 1 })
        .lean();

    return {
        previous,
        next,
    };
}
