import { connectDB } from "@/lib/mongodb";
import { Gallery, IGallery } from "@/models/gallery";
import { GalleryData } from "@/types/gallery";

interface FindAllGalleryParams {
    page?: number;
    limit?: number;
    search?: string;
    album?: string;
    published?: boolean;
}

interface GalleryResult {
    data: GalleryData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface GalleryDocument {
    _id: {
        toString(): string;
    };
    title: string;
    slug: string;
    description?: string;
    album: string;
    image: string;
    takenAt: Date;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

function transformGallery(doc: GalleryDocument): GalleryData {
    return {
        id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        description: doc.description ?? "",
        album: doc.album,
        image: doc.image,
        takenAt: doc.takenAt.toISOString(),
        isPublished: doc.isPublished,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    };
}

export async function findAllGallery({
    page = 1,
    limit = 10,
    search,
    album,
    published,
}: FindAllGalleryParams = {}): Promise<GalleryResult> {
    await connectDB();

    const filter: Record<string, unknown> = {};

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (album) {
        filter.album = album;
    }

    if (typeof published === "boolean") {
        filter.isPublished = published;
    }

    const total = await Gallery.countDocuments(filter);

    const galleries = await Gallery.find(filter)
        .sort({
            takenAt: -1,
            createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return {
        data: galleries.map((gallery) => transformGallery(gallery as GalleryDocument)),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function findGalleryById(id: string): Promise<GalleryData | null> {
    await connectDB();

    const gallery = await Gallery.findById(id).lean();

    if (!gallery) {
        return null;
    }

    return transformGallery(gallery as GalleryDocument);
}

export async function findGalleryBySlug(slug: string): Promise<GalleryData | null> {
    await connectDB();

    const gallery = await Gallery.findOne({
        slug,
    }).lean();

    if (!gallery) {
        return null;
    }

    return transformGallery(gallery as GalleryDocument);
}

export async function findPublishedGallery() {
    await connectDB();

    const gallery = await Gallery.find({
        isPublished: true,
    })
        .sort({
            takenAt: -1,
            createdAt: -1,
        })
        .lean();

    return gallery.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        description: item.description ?? "",
        album: item.album,
        image: item.image,
        takenAt: item.takenAt instanceof Date ? item.takenAt.toISOString() : String(item.takenAt),
        isPublished: item.isPublished,
    }));
}

export async function createGallery(payload: Partial<IGallery>): Promise<GalleryData> {
    await connectDB();

    const gallery = await Gallery.create(payload);

    return transformGallery(gallery.toObject() as GalleryDocument);
}

export async function updateGallery(
    id: string,
    payload: Partial<IGallery>,
): Promise<GalleryData | null> {
    await connectDB();

    const gallery = await Gallery.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).lean();

    if (!gallery) {
        return null;
    }

    return transformGallery(gallery as GalleryDocument);
}

export async function deleteGallery(id: string): Promise<void> {
    await connectDB();

    await Gallery.findByIdAndDelete(id);
}

export async function toggleGalleryPublish(id: string, isPublished: boolean) {
    await connectDB();

    return Gallery.findByIdAndUpdate(
        id,
        {
            isPublished,
        },
        {
            new: true,
        },
    ).lean();
}
