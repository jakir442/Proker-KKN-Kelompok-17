import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter").max(150),
    excerpt: z.string().min(20, "Ringkasan minimal 20 karakter"),
    content: z.string().min(50, "Isi berita minimal 50 karakter"),
    image: z.string(),
    category: z.string(),
    published: z.boolean(),
});

export type NewsInput = z.infer<typeof newsSchema>;
