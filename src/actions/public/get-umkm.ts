"use server";

import { findPublishedUMKM } from "@/repositories/umkm.repository";

export async function getUMKMAction() {
    try {
        const data = await findPublishedUMKM();

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: [],
        };
    }
}
