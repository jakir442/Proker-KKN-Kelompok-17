"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewsAction } from "@/actions/news/create-news";
import { updateNewsAction } from "@/actions/news/update-news";
import { ImageUpload } from "@/components/upload/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsFormValues, newsSchema } from "@/lib/validations/news";

interface NewsFormProps {
    initialData?: NewsFormValues & {
        id: string;
    };
    onSuccess?: () => void;
}

export function NewsForm({ initialData, onSuccess }: NewsFormProps) {
    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            category: "",
            content: "",
            image: "",
            published: false,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                excerpt: initialData.excerpt,
                category: initialData.category,
                content: initialData.content,
                image: initialData.image,
                published: initialData.published,
            });
        } else {
            form.reset({
                title: "",
                excerpt: "",
                category: "",
                content: "",
                image: "",
                published: false,
            });
        }
    }, [initialData, form]);

    const onSubmit: SubmitHandler<NewsFormValues> = async (values) => {
        const result = initialData
            ? await updateNewsAction(initialData.id, values)
            : await createNewsAction(values);

        if (!result.success) {
            alert(result.message);
            return;
        }

        if (!initialData) {
            form.reset();
        }

        onSuccess?.();
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium">Judul</label>

                <Input placeholder="Masukkan judul berita..." {...form.register("title")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Kategori</label>

                <Input placeholder="Kategori" {...form.register("category")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Gambar</label>

                <ImageUpload
                    value={form.watch("image")}
                    onChange={(url: string) =>
                        form.setValue("image", url, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Ringkasan</label>

                <Textarea
                    rows={4}
                    placeholder="Ringkasan berita..."
                    {...form.register("excerpt")}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Isi</label>

                <Textarea rows={10} placeholder="Isi berita..." {...form.register("content")} />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    {initialData ? "Perbarui Berita" : "Simpan"}
                </button>
            </div>
        </form>
    );
}
