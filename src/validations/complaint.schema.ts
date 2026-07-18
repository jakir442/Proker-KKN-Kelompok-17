import { z } from "zod";

export const complaintSchema = z.object({
    name: z.string().trim().min(3).max(100),
    phone: z.string().optional().or(z.literal("")),
    email: z.string().email("Email tidak valid").optional().or(z.literal("")),
    title: z.string().trim().min(5).max(150),
    description: z.string().trim().min(10).max(3000),
    category: z.enum(["INFRASTRUKTUR", "PELAYANAN", "LINGKUNGAN", "SOSIAL", "LAINNYA"]),
    status: z.enum(["PENDING", "PROCESS", "DONE", "REJECTED"]),
    attachment: z.string().optional().or(z.literal("")),
    response: z.string().trim().max(2000).optional().or(z.literal("")),
    ticketNumber: z.string(),
    respondedAt: z.date().optional(),
    respondedBy: z.string().optional().or(z.literal("")),
});

export const createComplaintSchema = complaintSchema.omit({
    status: true,
    response: true,
    ticketNumber: true,
    respondedAt: true,
    respondedBy: true,
});

export const complaintStatusSchema = z.object({
    status: z.enum(["PENDING", "PROCESS", "DONE", "REJECTED"]),
});

export const complaintResponseSchema = z.object({
    status: z.enum(["PENDING", "PROCESS", "DONE", "REJECTED"]),

    response: z.string().trim().min(3, "Tanggapan minimal 3 karakter").max(2000),
});

export type ComplaintResponseValues = z.infer<typeof complaintResponseSchema>;

export type ComplaintFormValues = z.infer<typeof complaintSchema>;
export type CreateComplaintValues = z.infer<typeof createComplaintSchema>;
export type ComplaintStatusValues = z.infer<typeof complaintStatusSchema>;
