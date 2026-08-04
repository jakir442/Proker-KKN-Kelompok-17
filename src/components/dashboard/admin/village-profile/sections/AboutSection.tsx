"use client";

import { Controller } from "react-hook-form";

import { FormSection, FormTextarea } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function AboutSection({ form, loading }: VillageProfileSectionProps) {
    return (
        <FormSection
            title="Tentang Desa"
            description="Kelola informasi umum dan sejarah Desa Cintanagara."
        >
            <div className="space-y-6">
                <Controller
                    control={form.control}
                    name="about"
                    render={({ field, fieldState }) => (
                        <FormTextarea
                            label="Tentang Desa"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                            disabled={loading}
                            placeholder="Masukkan deskripsi singkat desa."
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="history"
                    render={({ field, fieldState }) => (
                        <FormTextarea
                            label="Sejarah Desa"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                            disabled={loading}
                            placeholder="Masukkan sejarah desa."
                        />
                    )}
                />
            </div>
        </FormSection>
    );
}
