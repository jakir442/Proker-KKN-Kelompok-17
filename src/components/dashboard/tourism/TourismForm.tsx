"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { createTourismAction } from "@/actions/tourism/create-tourism";
import { updateTourismAction } from "@/actions/tourism/update-tourism";

import { TOURISM_CATEGORIES, TOURISM_STATUS } from "@/constants/tourism";

import { ImageUpload } from "@/components/upload/image-upload";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { tourismSchema } from "@/validations/tourism.schema";

type TourismFormValues = z.infer<typeof tourismSchema>;

interface TourismFormProps {
    initialData?: TourismFormValues & {
        id: string;
    };

    onSuccess?: () => void;
}

export function TourismForm({ initialData, onSuccess }: TourismFormProps) {
    const form = useForm({
        resolver: zodResolver(tourismSchema),

        defaultValues: {
            name: "",
            shortDescription: "",
            description: "",

            image: "",
            gallery: [],

            address: "",

            latitude: undefined,
            longitude: undefined,

            category: TOURISM_CATEGORIES[0],

            facilities: [],

            openingHours: "",

            ticketPrice: undefined,

            contact: "",

            featured: false,

            status: "draft",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        } else {
            form.reset();
        }
    }, [initialData, form]);

    const onSubmit: SubmitHandler<TourismFormValues> = async (values) => {
        const result = initialData
            ? await updateTourismAction(initialData.id, values)
            : await createTourismAction(values);

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
                    <label className="mb-2 block text-sm font-medium">Nama Wisata</label>

                    <Input placeholder="Nama Wisata" {...form.register("name")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Kategori</label>

                    <Select
                        value={form.watch("category")}
                        onValueChange={(value) =>
                            form.setValue("category", value as TourismFormValues["category"])
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {TOURISM_CATEGORIES.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Alamat</label>

                    <Textarea rows={3} {...form.register("address")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Jam Operasional</label>

                    <Input placeholder="08:00 - 17:00" {...form.register("openingHours")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Harga Tiket</label>

                    <Input
                        type="number"
                        {...form.register("ticketPrice", {
                            setValueAs: (value) => (value === "" ? undefined : Number(value)),
                        })}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Kontak</label>

                    <Input placeholder="08xxxxxxxxxx" {...form.register("contact")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>

                    <Select
                        value={form.watch("status")}
                        onValueChange={(value) =>
                            form.setValue("status", value as TourismFormValues["status"])
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {TOURISM_STATUS.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Latitude</label>

                    <Input
                        type="number"
                        step="any"
                        {...form.register("latitude", {
                            setValueAs: (value) => (value === "" ? undefined : Number(value)),
                        })}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Longitude</label>

                    <Input
                        type="number"
                        step="any"
                        {...form.register("longitude", {
                            setValueAs: (value) => (value === "" ? undefined : Number(value)),
                        })}
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Cover Wisata</label>

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
                <label className="mb-2 block text-sm font-medium">Deskripsi Singkat</label>

                <Textarea rows={3} {...form.register("shortDescription")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Deskripsi</label>

                <Textarea rows={6} {...form.register("description")} />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    checked={form.watch("featured")}
                    onCheckedChange={(checked) => form.setValue("featured", !!checked)}
                />

                <span>Wisata Unggulan</span>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    {initialData ? "Perbarui Wisata" : "Simpan"}
                </button>
            </div>
        </form>
    );
}
