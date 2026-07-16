"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AnnouncementFormValues, announcementSchema } from "@/validations/announcement.schema";

import {
    createAnnouncementAction,
    updateAnnouncementAction,
} from "@/actions/announcements/announcements";

import { ANNOUNCEMENT_CATEGORIES } from "@/constants/announcements";

import { ImageUpload } from "@/components/upload/image-upload";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { AnnouncementTableData } from "@/types/announcement";

interface Props {
    mode: "create" | "edit";

    announcement?: AnnouncementTableData;

    onSuccess?: () => void;
}

export function AnnouncementForm({ mode, announcement, onSuccess }: Props) {
    const form = useForm<AnnouncementFormValues>({
        resolver: zodResolver(announcementSchema),

        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: ANNOUNCEMENT_CATEGORIES[0],
            coverImage: "",
            published: false,
        },
    });

    useEffect(() => {
        if (announcement) {
            form.reset({
                title: announcement.title,
                excerpt: announcement.excerpt,
                content: announcement.content,
                category: announcement.category as AnnouncementFormValues["category"],
                coverImage: announcement.coverImage,
                published: announcement.published,
            });
        } else {
            form.reset({
                title: "",
                excerpt: "",
                content: "",
                category: ANNOUNCEMENT_CATEGORIES[0],
                coverImage: "",
                published: false,
            });
        }
    }, [announcement, form]);

    const onSubmit: SubmitHandler<AnnouncementFormValues> = async (values) => {
        const result =
            mode === "create"
                ? await createAnnouncementAction({
                      ...values,
                      coverImage: values.coverImage ?? "",
                  })
                : await updateAnnouncementAction(announcement!.id, {
                      ...values,
                      coverImage: values.coverImage ?? "",
                  });

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        if (mode === "create") {
            form.reset();
        }

        onSuccess?.();
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium">Judul</label>

                <Input placeholder="Masukkan judul..." {...form.register("title")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Kategori</label>

                <Select
                    value={form.watch("category")}
                    onValueChange={(value) =>
                        form.setValue("category", value as AnnouncementFormValues["category"], {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>

                    <SelectContent>
                        {ANNOUNCEMENT_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Cover</label>

                <ImageUpload
                    value={form.watch("coverImage")}
                    onChange={(url: string) =>
                        form.setValue("coverImage", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Ringkasan</label>

                <Textarea
                    rows={4}
                    placeholder="Ringkasan pengumuman..."
                    {...form.register("excerpt")}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Isi Pengumuman</label>

                <Textarea rows={10} placeholder="Isi pengumuman..." {...form.register("content")} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="font-medium">Publish</p>

                    <p className="text-sm text-muted-foreground">
                        Pengumuman akan tampil di halaman publik.
                    </p>
                </div>

                <Switch
                    checked={form.watch("published")}
                    onCheckedChange={(checked) =>
                        form.setValue("published", checked, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Menyimpan..."
                        : mode === "create"
                          ? "Simpan Pengumuman"
                          : "Perbarui Pengumuman"}
                </Button>
            </div>
        </form>
    );
}
