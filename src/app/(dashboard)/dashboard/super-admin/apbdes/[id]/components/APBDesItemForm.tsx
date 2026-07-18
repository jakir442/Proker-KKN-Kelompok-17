"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { APBDesItemInput, apbdesItemSchema } from "@/validations/apbdes-item.schema";
import { BudgetCategory } from "@/constants/apbdes";
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

import { APBDesItemTableData } from "@/types/apbdes-item";
import { createAPBDesItemAction, updateAPBDesItemAction } from "@/actions/apbdes-item/apbdes-item";

interface Props {
    mode: "create" | "edit";

    apbdesId: string;

    item?: APBDesItemTableData;

    onSuccess?: () => void;
}

export function APBDesItemForm({ mode, apbdesId, item, onSuccess }: Props) {
    const form = useForm<APBDesItemInput>({
        resolver: zodResolver(apbdesItemSchema),

        defaultValues: {
            apbdesId,
            category: BudgetCategory.REVENUE,
            name: "",
            budget: 0,
            realization: 0,
            notes: "",
        },
    });

    useEffect(() => {
        if (item) {
            form.reset({
                apbdesId,
                category: item.category,
                name: item.name,
                budget: item.budget,
                realization: item.realization,
                notes: item.notes,
            });
        } else {
            form.reset({
                apbdesId,
                category: BudgetCategory.REVENUE,
                name: "",
                budget: 0,
                realization: 0,
                notes: "",
            });
        }
    }, [item, apbdesId, form]);

    const onSubmit: SubmitHandler<APBDesItemInput> = async (values) => {
        const result =
            mode === "create"
                ? await createAPBDesItemAction(values)
                : await updateAPBDesItemAction(item!.id, values);

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
                <label className="mb-2 block text-sm font-medium">Kategori</label>

                <Select
                    value={form.watch("category")}
                    onValueChange={(value) =>
                        form.setValue("category", value as BudgetCategory, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value={BudgetCategory.REVENUE}>Pendapatan</SelectItem>

                        <SelectItem value={BudgetCategory.EXPENDITURE}>Belanja</SelectItem>

                        <SelectItem value={BudgetCategory.FINANCING}>Pembiayaan</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Nama Item</label>

                <Input placeholder="Nama anggaran..." {...form.register("name")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Anggaran</label>

                <Input
                    type="number"
                    {...form.register("budget", {
                        valueAsNumber: true,
                    })}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Realisasi</label>

                <Input
                    type="number"
                    {...form.register("realization", {
                        valueAsNumber: true,
                    })}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Catatan</label>

                <Textarea rows={4} placeholder="Catatan..." {...form.register("notes")} />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Menyimpan..."
                        : mode === "create"
                          ? "Simpan Item"
                          : "Perbarui Item"}
                </Button>
            </div>
        </form>
    );
}
