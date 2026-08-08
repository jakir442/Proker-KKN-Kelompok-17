"use client";

import { Controller } from "react-hook-form";

import { FormInput, FormSection } from "@/components/forms";
import { LocationPicker } from "@/components/maps/LocationPicker";

import type { VillageProfileSectionProps } from "../section-props";

export function LocationSection({ form, loading }: VillageProfileSectionProps) {
    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = form;

    const locationValue = watch("location");

    const latitude = locationValue?.latitude;
    const longitude = locationValue?.longitude;

    return (
        <FormSection
            title="Lokasi Desa"
            description="Kelola lokasi kantor Desa Cintanagara melalui peta interaktif."
        >
            <div className="space-y-6">
                {/* ================= MAP ================= */}
                <Controller
                    control={control}
                    name="location.latitude"
                    render={() => (
                        <LocationPicker
                            latitude={latitude}
                            longitude={longitude}
                            onChange={(lat, lng) => {
                                setValue("location.latitude", lat, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });

                                setValue("location.longitude", lng, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
                        />
                    )}
                />

                {/* ================= COORDINATES ================= */}
                <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                        id="latitude"
                        label="Latitude"
                        type="number"
                        step="any"
                        disabled={loading}
                        {...register("location.latitude", {
                            valueAsNumber: true,
                        })}
                        error={errors.location?.latitude?.message}
                        helperText="Koordinat lintang kantor desa."
                    />

                    <FormInput
                        id="longitude"
                        label="Longitude"
                        type="number"
                        step="any"
                        disabled={loading}
                        {...register("location.longitude", {
                            valueAsNumber: true,
                        })}
                        error={errors.location?.longitude?.message}
                        helperText="Koordinat bujur kantor desa."
                    />
                </div>

                {/* ================= ROUTE INFO ================= */}
                <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Navigasi ke Kantor Desa</p>

                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Tombol rute pada website publik akan otomatis mengarahkan pengunjung ke
                            koordinat kantor Desa Cintanagara menggunakan Google Maps.
                        </p>

                        {typeof latitude === "number" && typeof longitude === "number" && (
                            <p className="pt-2 text-xs font-medium text-foreground">
                                Tujuan: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </FormSection>
    );
}
