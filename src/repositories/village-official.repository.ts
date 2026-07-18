import { connectDB } from "@/lib/mongodb";
import { IVillageOfficial, VillageOfficial } from "@/models/village-official";

export async function findAll(): Promise<IVillageOfficial[]> {
    await connectDB();

    return await VillageOfficial.find().sort({ order: 1 }).lean<IVillageOfficial[]>().exec();
}

export async function findPublished(): Promise<IVillageOfficial[]> {
    await connectDB();

    return await VillageOfficial.find({
        isActive: true,
    })
        .sort({ order: 1 })
        .lean<IVillageOfficial[]>()
        .exec();
}

export async function findById(id: string): Promise<IVillageOfficial | null> {
    await connectDB();

    return await VillageOfficial.findById(id).lean<IVillageOfficial>().exec();
}

export async function create(data: Partial<IVillageOfficial>): Promise<IVillageOfficial> {
    await connectDB();

    const official = await VillageOfficial.create(data);

    return official.toObject();
}

export async function update(
    id: string,
    data: Partial<IVillageOfficial>,
): Promise<IVillageOfficial | null> {
    await connectDB();

    return await VillageOfficial.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
        .lean<IVillageOfficial>()
        .exec();
}

export async function deleteById(id: string): Promise<boolean> {
    await connectDB();

    const result = await VillageOfficial.findByIdAndDelete(id).exec();

    return result !== null;
}

export async function findActive(): Promise<IVillageOfficial[]> {
    await connectDB();

    return VillageOfficial.find({
        isActive: true,
    })
        .sort({ order: 1 })
        .lean<IVillageOfficial[]>();
}
