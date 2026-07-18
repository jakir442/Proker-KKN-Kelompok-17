"use server";

import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";

export async function getAPBDesChartAction(apbdesId: string) {
    try {
        const data = await APBDesItemRepository.getChartData(apbdesId);

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data grafik.",
            data: [],
        };
    }
}
