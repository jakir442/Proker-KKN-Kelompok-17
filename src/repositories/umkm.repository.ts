import { connectDB } from "@/lib/mongodb";
import { UMKM } from "@/models/umkm";
import type { IUMKM } from "@/types/umkm";

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

    return UMKM.findById(id).lean();
}

export async function findUMKMBySlug(slug: string) {
    await connectDB();

    return UMKM.findOne({
        slug,
        isActive: true,
    }).lean();
}

interface FindUMKMParams {
    search?: string;
    category?: string;
    status?: string;
}

export async function findAllUMKM({ search, category, status }: FindUMKMParams = {}) {
    await connectDB();

    const filter: { [key: string]: unknown } = {};

    if (search) {
        filter["$or"] = [
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
        filter["category"] = category;
    }

    if (status === "ACTIVE") {
        filter["isActive"] = true;
    }

    if (status === "INACTIVE") {
        filter["isActive"] = false;
    }

    return UMKM.find(filter)
        .sort({
            createdAt: -1,
        })
        .lean();
}

export async function searchUMKM(keyword: string) {
    await connectDB();

    return UMKM.find({
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
}

export async function toggleFeatured(id: string) {
    await connectDB();
    const umkm = await UMKM.findById(id);

    if (!umkm) return null;

    umkm.featured = !umkm.featured;

    await umkm.save();

    return umkm;
}

export async function toggleActive(id: string) {
    await connectDB();

    const umkm = await UMKM.findById(id);

    if (!umkm) return null;

    umkm.isActive = !umkm.isActive;

    await umkm.save();

    return umkm;
}

export async function findFeaturedUMKM(limit = 6) {
    await connectDB();

    return UMKM.find({
        isActive: true,
        featured: true,
    })
        .sort({
            createdAt: -1,
        })
        .limit(limit)
        .lean();
}
