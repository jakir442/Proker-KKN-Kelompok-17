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

    const locationValue = watch("location") as
        | { latitude?: number; longitude?: number }
        | undefined;
    const latitude = locationValue?.latitude;
    const longitude = locationValue?.longitude;

    return (
        <FormSection
            title="Lokasi Desa"
            description="Kelola lokasi kantor desa melalui peta interaktif."
        >
            <div className="space-y-6">
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
                                });

                                setValue("location.longitude", lng, {
                                    shouldDirty: true,
                                });
                            }}
                        />
                    )}
                />

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
                    />
                </div>

                <FormInput
                    id="googleMaps"
                    label="Link Google Maps"
                    placeholder="https://maps.google.com/..."
                    disabled={loading}
                    {...register("location.googleMaps")}
                    error={errors.location?.googleMaps?.message}
                    helperText="Opsional. Digunakan untuk tombol navigasi di website publik."
                />
            </div>
        </FormSection>
    );
}
