"use server";

import { revalidatePath } from "next/cache";

import {
    createComplaintSchema,
    complaintStatusSchema,
    complaintResponseSchema,
} from "@/validations/complaint.schema";
import {
    findAllComplaints,
    findComplaintById,
    createComplaint,
    updateComplaintStatus,
    deleteComplaint,
    respondComplaint,
} from "@/repositories/complaint.repository";

function generateTicketNumber() {
    const now = new Date();
    const date =
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `CMP-${date}-${random}`;
}

export async function respondComplaintAction(id: string, values: unknown) {
    try {
        const validated = complaintResponseSchema.parse(values);
        const complaint = await respondComplaint(id, validated);

        revalidatePath("/dashboard/complaints");

        return {
            success: true,
            data: complaint,
            message: "Tanggapan berhasil dikirim.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memberikan tanggapan.",
        };
    }
}

export async function getComplaints(filters?: {
    search?: string;
    status?: string;
    category?: string;
}) {
    try {
        const complaints = await findAllComplaints(filters);

        return {
            success: true,
            data: complaints,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data pengaduan.",
        };
    }
}

export async function getComplaint(id: string) {
    try {
        const complaint = await findComplaintById(id);
        if (!complaint) {
            return {
                success: false,
                message: "Pengaduan tidak ditemukan.",
            };
        }

        return {
            success: true,
            data: complaint,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data pengaduan.",
        };
    }
}

export async function createComplaintAction(values: unknown) {
    try {
        const validated = createComplaintSchema.parse(values);

        const complaint = await createComplaint({
            ...validated,
            ticketNumber: generateTicketNumber(),
            status: "PENDING",
        });

        revalidatePath("/aspirasi");
        revalidatePath("/dashboard/complaints");

        return {
            success: true,
            data: complaint,
            ticketNumber: complaint.ticketNumber,
            message: "Pengaduan berhasil dikirim.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengirim pengaduan.",
        };
    }
}

export async function updateComplaintStatusAction(id: string, values: unknown) {
    try {
        const validated = complaintStatusSchema.parse(values);

        const complaint = await updateComplaintStatus(id, validated.status);

        revalidatePath("/dashboard/complaints");

        return {
            success: true,
            data: complaint,
            message: "Status berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui status.",
        };
    }
}

export async function deleteComplaintAction(id: string) {
    try {
        await deleteComplaint(id);

        revalidatePath("/dashboard/complaints");

        return {
            success: true,
            message: "Pengaduan berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus pengaduan.",
        };
    }
}
