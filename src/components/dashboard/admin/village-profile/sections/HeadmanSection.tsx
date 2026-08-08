"use client";

import { Controller } from "react-hook-form";

import { FormInput, FormSection, FormTextarea, FormUpload } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function HeadmanSection({ form, loading }: VillageProfileSectionProps) {
    const {
        control,
        register,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const photoUrl = watch("headman.photoUrl");
    const photoSettings = watch("headman.photoSettings");

    return (
        <FormSection
            title="Kepala Desa"
            description="Kelola informasi kepala desa dan sambutan resmi."
        >
            <div className="space-y-6">
                {/* ============================================
                    INFORMASI KEPALA DESA
                ============================================ */}

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

                {/* ============================================
                    FOTO KEPALA DESA
                ============================================ */}

                <Controller
                    control={control}
                    name="headman.photo"
                    render={({ field }) => (
                        <FormUpload
                            id="headman-photo"
                            label="Foto Kepala Desa"
                            value={field.value ?? null}
                            previewUrl={photoUrl}
                            photoSettings={photoSettings}
                            folder="village/headman"
                            onChange={(file) => {
                                field.onChange(file);

                                if (!file) {
                                    setValue("headman.photoUrl", "", {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    });

                                    setValue(
                                        "headman.photoSettings",
                                        {
                                            zoom: 1,
                                            positionX: 50,
                                            positionY: 50,
                                        },
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        },
                                    );
                                }
                            }}
                            onUploaded={(url) => {
                                setValue("headman.photoUrl", url, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
                            onPhotoSettingsChange={(settings) => {
                                setValue("headman.photoSettings", settings, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
                            error={errors.headman?.photo?.message}
                            disabled={loading}
                            accept="image/jpeg,image/png,image/webp"
                            aspectRatio="4/5"
                        />
                    )}
                />

                {/* ============================================
                    SAMBUTAN
                ============================================ */}

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
