"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createGalleryAction } from "@/actions/gallery/create-gallery";
import { updateGalleryAction } from "@/actions/gallery/update-gallery";

import { ImageUpload } from "@/components/upload/image-upload";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { GALLERY_ALBUMS } from "@/constants/gallery";
import { GalleryInput, gallerySchema } from "@/validations/gallery.schema";

interface GalleryFormProps {
    initialData?: GalleryInput & {
        id: string;
    };
    onSuccess?: () => void;
}

export function GalleryForm({ initialData, onSuccess }: GalleryFormProps) {
    const form = useForm<GalleryInput>({
        resolver: zodResolver(gallerySchema),

        defaultValues: {
            title: "",
            description: "",
            album: GALLERY_ALBUMS[0],
            image: "",
            takenAt: new Date(),
            isPublished: true,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        } else {
            form.reset({
                title: "",
                description: "",
                album: GALLERY_ALBUMS[0],
                image: "",
                takenAt: new Date(),
                isPublished: true,
            });
        }
    }, [form, initialData]);

    const onSubmit: SubmitHandler<GalleryInput> = async (values) => {
        const result = initialData
            ? await updateGalleryAction(initialData.id, values)
            : await createGalleryAction(values);

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium">Judul</label>

                <Input placeholder="Judul foto..." {...form.register("title")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Album</label>

                <select className="w-full rounded-md border px-3 py-2" {...form.register("album")}>
                    {GALLERY_ALBUMS.map((album) => (
                        <option key={album} value={album}>
                            {album}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Foto</label>

                <ImageUpload
                    value={form.watch("image")}
                    onChange={(url: string) =>
                        form.setValue("image", url as never, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Tanggal Kegiatan</label>

                <Input
                    type="date"
                    value={
                        form.watch("takenAt")
                            ? new Date(form.watch("takenAt")).toISOString().split("T")[0]
                            : ""
                    }
                    onChange={(e) =>
                        form.setValue("takenAt", new Date(e.target.value) as never, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Deskripsi</label>

                <Textarea rows={5} placeholder="Deskripsi..." {...form.register("description")} />
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" {...form.register("isPublished")} />

                <label>Publikasikan</label>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    {initialData ? "Perbarui Galeri" : "Simpan"}
                </button>
            </div>
        </form>
    );
}
