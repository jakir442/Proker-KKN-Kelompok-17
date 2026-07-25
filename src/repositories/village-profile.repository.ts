import { connectDB } from "@/lib/mongodb";
import { VillageProfile, IVillageProfile } from "@/models/village-profile";
import type { FlattenMaps } from "mongoose";

function serializeVillageProfile(
    profile: (FlattenMaps<IVillageProfile> & { _id: { toString(): string } }) | null,
): IVillageProfile | null {
    if (!profile) return null;

    return {
        ...profile,
        _id: profile._id.toString(),
    };
}

export async function getProfile(): Promise<IVillageProfile | null> {
    await connectDB();

    const profile = await VillageProfile.findOne().lean();

    return serializeVillageProfile(profile);
}

export async function upsertProfile(data: Partial<IVillageProfile>): Promise<IVillageProfile> {
    await connectDB();

    const profile = await VillageProfile.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        lean: true,
    });

    return serializeVillageProfile(profile)!;
}
