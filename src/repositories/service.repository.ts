import { connectDB } from "@/lib/mongodb";
import { Service, IService } from "@/models/service";

interface FindAllServicesParams {
    search?: string;
    status?: string;
}

export async function findAllServices({
    search = "",
    status,
}: FindAllServicesParams): Promise<IService[]> {
    await connectDB();

    const query: {
        $or?: {
            title?: {
                $regex: string;
                $options: string;
            };
            description?: {
                $regex: string;
                $options: string;
            };
        }[];
        isPublished?: boolean;
    } = {};

    if (search) {
        query.$or = [
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

    if (status && status !== "ALL") {
        query.isPublished = status === "PUBLISHED";
    }

    return (await Service.find(query)
        .sort({
            createdAt: -1,
        })
        .lean()) as IService[];
}

export async function getAllServices(): Promise<IService[]> {
    await connectDB();

    return (await Service.find().sort({ createdAt: -1 }).lean()) as IService[];
}

export async function getPublishedServices(): Promise<IService[]> {
    await connectDB();

    return (await Service.find({
        isPublished: true,
    })
        .sort({ createdAt: -1 })
        .lean()) as IService[];
}

export async function createService(data: Partial<IService>): Promise<IService> {
    await connectDB();

    const service = await Service.create(data);

    return service.toObject() as IService;
}

export async function getServiceById(id: string): Promise<IService | null> {
    await connectDB();

    return (await Service.findById(id).lean()) as IService | null;
}

export async function findServiceBySlug(slug: string): Promise<IService | null> {
    await connectDB();

    return (await Service.findOne({
        slug,
    }).lean()) as IService | null;
}

export async function updateService(id: string, data: Partial<IService>): Promise<IService | null> {
    await connectDB();

    return Service.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).lean<IService>();
}

export async function deleteService(id: string): Promise<void> {
    await connectDB();

    await Service.findByIdAndDelete(id);
}

export async function updateServiceStatus(id: string, isPublished: boolean) {
    await connectDB();

    return Service.findByIdAndUpdate(
        id,
        {
            isPublished,
        },
        {
            new: true,
        },
    );
}
