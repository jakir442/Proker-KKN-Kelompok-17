"use server";

import { findActive } from "@/repositories/village-official.repository";

export async function getVillageOfficialsPublicAction() {
    try {
        const officials = await findActive();

        return {
            success: true,
            data: officials.map((item) => ({
                id: item._id!.toString(),
                name: item.name,
                position: item.position,
                photo: item.photo,
                phone: item.phone,
                email: item.email,
                order: item.order,
            })),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data perangkat desa.",
            data: [],
        };
    }
}
