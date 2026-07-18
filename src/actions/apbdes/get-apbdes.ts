"use server";

import { APBDesStatus } from "@/constants/apbdes";
import { APBDesRepository } from "@/repositories/apbdes.repository";
import { APBDesTableData } from "@/types/apbdes";

interface GetAPBDesParams {
    search?: string;
    status?: APBDesStatus;
    year?: number;
}

export async function getAPBDesAction(params: GetAPBDesParams) {
    try {
        const apbdes = await APBDesRepository.findAll(params);

        const data: APBDesTableData[] = apbdes.map((item) => ({
            id: item._id.toString(),
            year: item.year,
            title: item.title,
            description: item.description,
            status: item.status,
            createdAt:
                item.createdAt instanceof Date
                    ? item.createdAt.toISOString()
                    : String(item.createdAt),
            updatedAt:
                item.updatedAt instanceof Date
                    ? item.updatedAt.toISOString()
                    : String(item.updatedAt),
        }));

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: [] as APBDesTableData[],
            message: "Gagal mengambil data APBDes.",
        };
    }
}
