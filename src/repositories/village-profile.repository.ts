import { connectDB } from "@/lib/mongodb";
import { VillageProfile, IVillageProfile } from "@/models/village-profile";

export async function getProfile(): Promise<IVillageProfile | null> {
    await connectDB();

    return await VillageProfile.findOne().lean<IVillageProfile>();
}

export async function upsertProfile(data: Partial<IVillageProfile>): Promise<IVillageProfile> {
    await connectDB();

    const profile = await VillageProfile.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    }).lean<IVillageProfile>();

    return profile!;
}
