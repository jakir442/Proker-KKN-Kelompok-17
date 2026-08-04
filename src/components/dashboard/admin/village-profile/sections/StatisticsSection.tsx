"use client";

import { FormInput, FormSection } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function StatisticsSection({ form, loading }: VillageProfileSectionProps) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <FormSection
            title="Statistik Desa"
            description="Kelola data statistik wilayah dan penduduk."
        >
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                    id="statistics-area"
                    label="Luas Wilayah (Ha)"
                    type="number"
                    placeholder="Contoh: 250"
                    disabled={loading}
                    {...register("statistics.area", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.area?.message}
                />

                <FormInput
                    id="statistics-population"
                    label="Jumlah Penduduk"
                    type="number"
                    placeholder="Contoh: 5000"
                    disabled={loading}
                    {...register("statistics.population", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.population?.message}
                />

                <FormInput
                    id="statistics-households"
                    label="Jumlah Kepala Keluarga"
                    type="number"
                    placeholder="Contoh: 1500"
                    disabled={loading}
                    {...register("statistics.households", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.households?.message}
                />

                <FormInput
                    id="statistics-hamlets"
                    label="Jumlah Dusun"
                    type="number"
                    placeholder="Contoh: 4"
                    disabled={loading}
                    {...register("statistics.hamlets", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.hamlets?.message}
                />

                <FormInput
                    id="statistics-rt"
                    label="Jumlah RT"
                    type="number"
                    placeholder="Contoh: 20"
                    disabled={loading}
                    {...register("statistics.rt", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.rt?.message}
                />

                <FormInput
                    id="statistics-rw"
                    label="Jumlah RW"
                    type="number"
                    placeholder="Contoh: 5"
                    disabled={loading}
                    {...register("statistics.rw", {
                        valueAsNumber: true,
                    })}
                    error={errors.statistics?.rw?.message}
                />
            </div>
        </FormSection>
    );
}
