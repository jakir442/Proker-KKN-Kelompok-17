import { connectDB } from "@/lib/mongodb";
import { TourismModel } from "@/models/tourism";
import type { TourismDocument } from "@/models/tourism";

export async function createTourism(data: Partial<TourismDocument>) {
    await connectDB();

    return TourismModel.create(data);
}

export async function updateTourism(id: string, data: Partial<TourismDocument>) {
    await connectDB();

    return TourismModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

export async function deleteTourism(id: string) {
    await connectDB();

    return TourismModel.findByIdAndDelete(id);
}

export async function findTourismById(id: string) {
    await connectDB();

    return TourismModel.findById(id).lean();
}

export async function findTourismBySlug(slug: string) {
    await connectDB();

    return TourismModel.findOne({
        slug,
        status: "published",
    }).lean();
}

interface FindTourismParams {
    search?: string;
    category?: string;
    status?: string;
}

export async function findAllTourism({ search, category, status }: FindTourismParams = {}) {
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
                address: {
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
            {
                shortDescription: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (category && category !== "ALL") {
        filter.category = category;
    }

    if (status && status !== "ALL") {
        filter.status = status;
    }

    return TourismModel.find(filter)
        .sort({
            createdAt: -1,
        })
        .lean();
}

export async function searchTourism(keyword: string) {
    await connectDB();

    return TourismModel.find({
        status: "published",
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
}

export async function toggleFeatured(id: string) {
    await connectDB();

    const tourism = await TourismModel.findById(id);

    if (!tourism) {
        return null;
    }

    tourism.featured = !tourism.featured;

    await tourism.save();

    return tourism;
}

export async function toggleStatus(id: string) {
    await connectDB();

    const tourism = await TourismModel.findById(id);

    if (!tourism) {
        return null;
    }

    tourism.status = tourism.status === "published" ? "draft" : "published";

    await tourism.save();

    return tourism;
}

export async function findFeaturedTourism(limit = 6) {
    await connectDB();

    return TourismModel.find({
        featured: true,
        status: "published",
    })
        .sort({
            createdAt: -1,
        })
        .limit(limit)
        .lean();
}
