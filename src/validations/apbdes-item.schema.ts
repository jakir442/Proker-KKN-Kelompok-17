import { z } from "zod";
import { BudgetCategory } from "@/constants/apbdes";

export const apbdesItemSchema = z.object({
    apbdesId: z
        .string({
            error: "APBDes wajib dipilih",
        })
        .regex(/^[a-fA-F0-9]{24}$/, {
            message: "ID APBDes tidak valid",
        }),

    category: z.nativeEnum(BudgetCategory),

    name: z
        .string({
            error: "Nama anggaran wajib diisi",
        })
        .trim()
        .min(3, "Nama anggaran minimal 3 karakter")
        .max(200, "Nama anggaran maksimal 200 karakter"),

    budget: z
        .number({
            error: "Anggaran wajib diisi",
        })
        .min(0, "Anggaran tidak boleh kurang dari 0"),

    realization: z
        .number({
            error: "Realisasi wajib diisi",
        })
        .min(0, "Realisasi tidak boleh kurang dari 0"),

    notes: z.string().trim().max(1000, "Catatan maksimal 1000 karakter").catch(""),
});

export type APBDesItemInput = z.output<typeof apbdesItemSchema>;
