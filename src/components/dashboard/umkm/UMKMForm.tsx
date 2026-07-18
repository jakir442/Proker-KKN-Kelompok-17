"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { createUMKMAction } from "@/actions/umkm/create-umkm";
import { updateUMKMAction } from "@/actions/umkm/update-umkm";

import { ImageUpload } from "@/components/upload/image-upload";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { umkmSchema } from "@/validations/umkm.schema";

type UMKMFormValues = z.infer<typeof umkmSchema>;

interface UMKMFormProps {
    initialData?: UMKMFormValues & {
        id: string;
    };
    onSuccess?: () => void;
}

export function UMKMForm({ initialData, onSuccess }: UMKMFormProps) {
    const form = useForm<UMKMFormValues>({
        resolver: zodResolver(umkmSchema),

        defaultValues: {
            name: "",
            description: "",
            logo: "",
            gallery: [],
            owner: "",
            whatsapp: "",
            category: "",
            address: "",
            latitude: undefined,
            longitude: undefined,
            openTime: "",
            closeTime: "",
            featured: false,
            isActive: true,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        } else {
            form.reset();
        }
    }, [initialData, form]);

    const onSubmit: SubmitHandler<UMKMFormValues> = async (values) => {
        const result = initialData
            ? await updateUMKMAction(initialData.id, values)
            : await createUMKMAction(values);

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
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">Nama UMKM</label>

                    <Input placeholder="Nama UMKM" {...form.register("name")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Kategori</label>

                    <Input placeholder="Kuliner" {...form.register("category")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Pemilik</label>

                    <Input placeholder="Nama Pemilik" {...form.register("owner")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">WhatsApp</label>

                    <Input placeholder="08xxxxxxxxxx" {...form.register("whatsapp")} />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Alamat</label>

                    <Textarea rows={3} {...form.register("address")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Jam Buka</label>

                    <Input type="time" {...form.register("openTime")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Jam Tutup</label>

                    <Input type="time" {...form.register("closeTime")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Latitude</label>

                    <Input
                        type="number"
                        step="any"
                        {...form.register("latitude", {
                            valueAsNumber: true,
                        })}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Longitude</label>

                    <Input
                        type="number"
                        step="any"
                        {...form.register("longitude", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Logo</label>

                <ImageUpload
                    value={form.watch("logo")}
                    onChange={(url: string) =>
                        form.setValue("logo", url, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Deskripsi</label>

                <Textarea rows={6} {...form.register("description")} />
            </div>

            <div className="flex gap-8">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={form.watch("featured")}
                        onCheckedChange={(checked) => form.setValue("featured", !!checked)}
                    />

                    <span>UMKM Unggulan</span>
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={form.watch("isActive")}
                        onCheckedChange={(checked) => form.setValue("isActive", !!checked)}
                    />

                    <span>Aktif</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    {initialData ? "Perbarui UMKM" : "Simpan"}
                </button>
            </div>
        </form>
    );
}
