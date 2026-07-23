import { connectDB } from "@/lib/mongodb";
import { UMKM } from "@/models/umkm";
import { serializeDocument, serializeDocuments } from "@/lib/serialize";
import type { IUMKM } from "@/types/umkm";

function buildUMKMAggregate(filter: Record<string, unknown>) {
    return [
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "umkm_reviews",
                localField: "_id",
                foreignField: "umkmId",
                as: "reviews",
            },
        },
        {
            $addFields: {
                rating: {
                    $round: [
                        {
                            $ifNull: [
                                {
                                    $avg: "$reviews.rating",
                                },
                                0,
                            ],
                        },
                        1,
                    ],
                },
                reviewCount: {
                    $size: "$reviews",
                },
            },
        },
        {
            $project: {
                reviews: 0,
            },
        },
    ];
}

export async function createUMKM(data: Partial<IUMKM>) {
    await connectDB();

    return UMKM.create(data);
}

export async function updateUMKM(id: string, data: Partial<IUMKM>) {
    await connectDB();

    return UMKM.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

export async function deleteUMKM(id: string) {
    await connectDB();

    return UMKM.findByIdAndDelete(id);
}

export async function findUMKMById(id: string) {
    await connectDB();

    const umkm = await UMKM.findById(id).lean();

    return umkm ? serializeDocument(umkm) : null;
}

export async function findUMKMBySlug(slug: string) {
    await connectDB();

    const umkm = await UMKM.findOne({
        slug,
        isActive: true,
    }).lean();

    return umkm ? serializeDocument(umkm) : null;
}

interface FindUMKMParams {
    search?: string;
    category?: string;
    status?: "ACTIVE" | "INACTIVE";
    sort?: "newest" | "oldest" | "name" | "rating";
    page?: number;
    limit?: number;
}

export async function findAllUMKM({
    search,
    category,
    status,
    sort = "newest",
    page = 1,
    limit = 9,
}: FindUMKMParams = {}) {
    await connectDB();

    const filter: Record<string, unknown> = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                owner: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (category && category !== "ALL") {
        filter.category = category;
    }

    if (status === "ACTIVE") {
        filter.isActive = true;
    }

    if (status === "INACTIVE") {
        filter.isActive = false;
    }

    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
        case "oldest":
            sortOption = { createdAt: 1 };
            break;

        case "name":
            sortOption = { name: 1 };
            break;

        case "rating":
            sortOption = { rating: -1 };
            break;

        default:
            sortOption = { createdAt: -1 };
    }

    const total = await UMKM.countDocuments(filter);

    const data = await UMKM.aggregate([
        ...buildUMKMAggregate(filter),

        {
            $sort: sortOption,
        },

        {
            $skip: (page - 1) * limit,
        },

        {
            $limit: limit,
        },
    ]);

    const serialized = serializeDocuments(data);

    return {
        items: serialized,
        total,
        totalPages: Math.ceil(total / limit),
        page,
    };
}

export async function searchUMKM(keyword: string) {
    await connectDB();

    const data = await UMKM.find({
        isActive: true,
        $or: [
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                address: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ],
    }).lean();

    return serializeDocuments(data);
}

export async function toggleFeatured(id: string) {
    await connectDB();

    const umkm = await UMKM.findById(id);

    if (!umkm) return null;

    umkm.featured = !umkm.featured;

    await umkm.save();

    return serializeDocument(umkm.toObject());
}

export async function toggleActive(id: string) {
    await connectDB();

    const umkm = await UMKM.findById(id);

    if (!umkm) return null;

    umkm.isActive = !umkm.isActive;

    await umkm.save();

    return serializeDocument(umkm.toObject());
}

export async function findFeaturedUMKM(limit = 6) {
    await connectDB();

    const data = await UMKM.aggregate([
        ...buildUMKMAggregate({
            isActive: true,
        }),

        {
            $sort: {
                featured: -1,
                createdAt: -1,
            },
        },
    ]);

    return serializeDocuments(data);
}

export async function findPublishedUMKM() {
    await connectDB();

    const data = await UMKM.find({
        isActive: true,
    })
        .sort({
            featured: -1,
            createdAt: -1,
        })
        .lean();

    return serializeDocuments(data);
}

export async function findRelatedUMKM(category: string, currentSlug: string, limit = 3) {
    await connectDB();

    const data = await UMKM.find({
        isActive: true,
        slug: {
            $ne: currentSlug,
        },
        category,
    })
        .sort({
            featured: -1,
            createdAt: -1,
        })
        .limit(limit)
        .lean();

    return serializeDocuments(data);
}

export async function findUMKMCategories() {
    await connectDB();

    const categories = await UMKM.distinct("category", {
        isActive: true,
    });

    return categories.sort();
}
