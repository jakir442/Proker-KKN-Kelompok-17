"use client";

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
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Store, User, Tag, MapPinned, Clock3, Star, Image as ImageIcon } from "lucide-react";
import {
    FormActions,
    FormGrid,
    FormHeader,
    FormSection,
    FormInput,
    FormPhone,
    FormSwitch,
    FormTextarea,
    FormTimePicker,
} from "@/components/forms";

type UMKMFormValues = z.infer<typeof umkmSchema>;

interface UMKMFormProps {
    initialData?: UMKMFormValues & {
        id: string;
    };
    onSuccess?: () => void;
}

export function UMKMForm({ initialData, onSuccess }: UMKMFormProps) {
    const [isPending, startTransition] = useTransition();
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

    const {
        formState: { errors },
    } = form;

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        } else {
            form.reset();
        }
    }, [initialData, form]);

    function onSubmit(values: UMKMFormValues) {
        startTransition(async () => {
            const result = initialData
                ? await updateUMKMAction(initialData.id, values)
                : await createUMKMAction(values);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            if (!initialData) {
                form.reset();
            }

            onSuccess?.();
        });
    }

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormHeader
                icon={Store}
                title={initialData ? "Edit UMKM" : "Tambah UMKM"}
                description={
                    initialData
                        ? "Perbarui informasi UMKM yang ditampilkan kepada masyarakat."
                        : "Lengkapi informasi UMKM yang akan dipublikasikan di website desa."
                }
            />
            <FormSection
                title="Informasi Dasar"
                description="Data utama mengenai UMKM."
                icon={Store}
                delay={0}
            >
                <FormGrid>
                    <FormInput
                        id="name"
                        label="Nama UMKM"
                        required
                        icon={Store}
                        placeholder="Masukkan nama UMKM"
                        error={errors.name?.message}
                        {...form.register("name")}
                    />

                    <FormInput
                        id="category"
                        label="Kategori"
                        required
                        icon={Tag}
                        placeholder="Contoh: Kuliner"
                        error={errors.category?.message}
                        {...form.register("category")}
                    />

                    <FormInput
                        id="owner"
                        label="Pemilik"
                        required
                        icon={User}
                        placeholder="Nama pemilik"
                        error={errors.owner?.message}
                        {...form.register("owner")}
                    />

                    <FormPhone
                        id="whatsapp"
                        label="WhatsApp"
                        placeholder="08123456789"
                        error={errors.whatsapp?.message}
                        {...form.register("whatsapp")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Lokasi"
                description="Alamat dan koordinat lokasi usaha."
                icon={MapPinned}
                delay={0.05}
            >
                <FormGrid>
                    <FormTextarea
                        id="address"
                        label="Alamat"
                        className="min-h-28"
                        containerClassName="md:col-span-2"
                        placeholder="Masukkan alamat lengkap"
                        error={errors.address?.message}
                        {...form.register("address")}
                    />

                    <FormInput
                        id="latitude"
                        type="number"
                        step="any"
                        label="Latitude"
                        icon={MapPinned}
                        error={errors.latitude?.message}
                        {...form.register("latitude", {
                            valueAsNumber: true,
                        })}
                    />

                    <FormInput
                        id="longitude"
                        type="number"
                        step="any"
                        label="Longitude"
                        icon={MapPinned}
                        error={errors.longitude?.message}
                        {...form.register("longitude", {
                            valueAsNumber: true,
                        })}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Jam Operasional"
                description="Jam operasional UMKM."
                icon={Clock3}
                delay={0.1}
            >
                <FormGrid>
                    <FormTimePicker
                        id="openTime"
                        label="Jam Buka"
                        required
                        error={errors.openTime?.message}
                        {...form.register("openTime")}
                    />

                    <FormTimePicker
                        id="closeTime"
                        label="Jam Tutup"
                        required
                        error={errors.closeTime?.message}
                        {...form.register("closeTime")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Media"
                description="Logo dan deskripsi UMKM."
                icon={ImageIcon}
                delay={0.2}
            >
                <FormGrid>
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

                    <label className="mb-2 block text-sm font-medium">Deskripsi</label>
                    <Textarea rows={6} {...form.register("description")} />
                </FormGrid>
            </FormSection>

            <FormSection title="Publikasi" description="Pengaturan tampilan UMKM." icon={Star}>
                <FormGrid>
                    <FormSwitch
                        id="featured"
                        label="UMKM Unggulan"
                        description="Tampilkan UMKM pada bagian unggulan di halaman publik."
                        checked={form.watch("featured")}
                        onCheckedChange={(checked) => form.setValue("featured", checked)}
                    />

                    <FormSwitch
                        id="isActive"
                        label="Status Aktif"
                        description="Menentukan apakah UMKM ditampilkan kepada masyarakat."
                        checked={form.watch("isActive")}
                        onCheckedChange={(checked) => form.setValue("isActive", checked)}
                    />
                </FormGrid>
            </FormSection>

            <FormActions
                isPending={isPending}
                onCancel={onSuccess}
                submitText={initialData ? "Simpan Perubahan" : "Simpan UMKM"}
                pendingText="Menyimpan..."
            />
        </form>
    );
}
