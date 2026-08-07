"use client";

import { Controller } from "react-hook-form";

import { FormInput, FormSection, FormTextarea, FormUpload } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function HeadmanSection({ form, loading }: VillageProfileSectionProps) {
    const {
        control,
        register,
        formState: { errors },
    } = form;

    return (
        <FormSection
            title="Kepala Desa"
            description="Kelola informasi kepala desa dan sambutan resmi."
        >
            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                        id="headman-name"
                        label="Nama Kepala Desa"
                        placeholder="Masukkan nama kepala desa"
                        disabled={loading}
                        {...register("headman.name")}
                        error={errors.headman?.name?.message}
                    />

                    <FormInput
                        id="headman-position"
                        label="Jabatan"
                        placeholder="Contoh: Kepala Desa"
                        disabled={loading}
                        {...register("headman.position")}
                        error={errors.headman?.position?.message}
                    />
                </div>

                <Controller
                    control={form.control}
                    name="headman.photo"
                    render={({ field }) => (
                        <FormUpload
                            id="headman-photo"
                            label="Foto Kepala Desa"
                            value={field.value ?? form.watch("headman.photoUrl")}
                            onChange={(file) => {
                                field.onChange(file);

                                if (file) {
                                    form.setValue("headman.photoUrl", "", {
                                        shouldDirty: true,
                                    });
                                }
                            }}
                            error={errors.headman?.photo?.message}
                        />
                    )}
                />

                <FormTextarea
                    id="headman-greeting"
                    label="Sambutan Kepala Desa"
                    placeholder="Tuliskan sambutan kepala desa..."
                    rows={6}
                    disabled={loading}
                    {...register("headman.greeting")}
                    error={errors.headman?.greeting?.message}
                />
            </div>
        </FormSection>
    );
}
