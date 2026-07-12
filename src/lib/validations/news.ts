import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter").max(150),
    excerpt: z.string().min(20, "Ringkasan minimal 20 karakter"),
    category: z.string().min(1, "Kategori wajib diisi"),
    content: z.string().min(50, "Isi berita minimal 50 karakter"),
    image: z.string().min(1, "Gambar wajib diisi"),
    published: z.boolean(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
