"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormInput, FormSection } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function VisionMissionSection({ form, loading }: VillageProfileSectionProps) {
    const {
        control,
        register,
        formState: { errors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "mission",
    });

    return (
        <FormSection title="Visi & Misi" description="Kelola visi dan misi pembangunan desa.">
            <div className="space-y-6">
                <FormInput
                    id="vision"
                    label="Visi Desa"
                    placeholder="Masukkan visi desa"
                    disabled={loading}
                    {...register("vision")}
                    error={errors.vision?.message}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Misi Desa</h3>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                append({
                                    value: "",
                                })
                            }
                            disabled={loading}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Misi
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-3">
                            <div className="flex-1">
                                <FormInput
                                    id={`mission-${index}`}
                                    label={`Misi ${index + 1}`}
                                    placeholder="Masukkan misi desa"
                                    disabled={loading}
                                    {...register(`mission.${index}.value` as const)}
                                    error={errors.mission?.[index]?.value?.message}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="mt-8"
                                onClick={() => remove(index)}
                                disabled={loading}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    {fields.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Belum ada misi. Silakan tambahkan misi desa.
                        </p>
                    )}
                </div>
            </div>
        </FormSection>
    );
}
