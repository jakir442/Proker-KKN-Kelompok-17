"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { APBDesInput, apbdesSchema } from "@/validations/apbdes.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { APBDesTableData } from "@/types/apbdes";
import { createAPBDesAction, updateAPBDesAction } from "@/actions/apbdes/apbdes";
import { APBDesStatus } from "@/constants/apbdes";

interface Props {
    mode: "create" | "edit";

    apbdes?: APBDesTableData;

    onSuccess?: () => void;
}

export function APBDesForm({ mode, apbdes, onSuccess }: Props) {
    const form = useForm<APBDesInput>({
        resolver: zodResolver(apbdesSchema),

        defaultValues: {
            year: new Date().getFullYear(),
            title: "",
            description: "",
            status: APBDesStatus.DRAFT,
        },
    });

    useEffect(() => {
        if (apbdes) {
            form.reset({
                year: apbdes.year,
                title: apbdes.title,
                description: apbdes.description,
                status: apbdes.status,
            });
        } else {
            form.reset({
                year: new Date().getFullYear(),
                title: "",
                description: "",
                status: APBDesStatus.DRAFT,
            });
        }
    }, [apbdes, form]);

    const onSubmit: SubmitHandler<APBDesInput> = async (values) => {
        const result =
            mode === "create"
                ? await createAPBDesAction(values)
                : await updateAPBDesAction(apbdes!.id, values);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        if (mode === "create") {
            form.reset();
        }

        onSuccess?.();
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium">Tahun</label>

                <Input
                    type="number"
                    {...form.register("year", {
                        valueAsNumber: true,
                    })}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Judul</label>

                <Input placeholder="Contoh: APBDes Tahun 2026" {...form.register("title")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Deskripsi</label>

                <Textarea
                    rows={4}
                    placeholder="Deskripsi APBDes..."
                    {...form.register("description")}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Status</label>

                <Select
                    value={form.watch("status")}
                    onValueChange={(value) =>
                        form.setValue("status", value as APBDesStatus, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value={APBDesStatus.DRAFT}>Draft</SelectItem>

                        <SelectItem value={APBDesStatus.ACTIVE}>Aktif</SelectItem>

                        <SelectItem value={APBDesStatus.ARCHIVED}>Arsip</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Menyimpan..."
                        : mode === "create"
                          ? "Simpan APBDes"
                          : "Perbarui APBDes"}
                </Button>
            </div>
        </form>
    );
}
