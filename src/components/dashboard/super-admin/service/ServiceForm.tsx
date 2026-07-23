"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { createServiceAction } from "@/actions/service/create-service";
import { updateServiceAction } from "@/actions/service/update-service";
import type { ServiceColumn } from "./ServiceColumns";

interface Props {
    initialData?: ServiceColumn;
    onSuccess: () => void;
}

export function ServiceForm({ initialData, onSuccess }: Props) {
    const [pending, startTransition] = useTransition();

    const [title, setTitle] = useState(initialData?.title ?? "");

    const [description, setDescription] = useState(initialData?.description ?? "");

    const [requirements, setRequirements] = useState<string[]>(initialData?.requirements ?? [""]);

    const [process, setProcess] = useState(initialData?.process ?? "");

    const [duration, setDuration] = useState(initialData?.duration ?? "");

    const [fee, setFee] = useState(initialData?.fee ?? "");

    const [icon, setIcon] = useState(initialData?.icon ?? "FileText");

    const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);

    function addRequirement() {
        setRequirements([...requirements, ""]);
    }

    function updateRequirement(index: number, value: string) {
        const updated = [...requirements];

        updated[index] = value;

        setRequirements(updated);
    }

    function removeRequirement(index: number) {
        setRequirements(requirements.filter((_, i) => i !== index));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const data = {
                title,
                description,
                requirements: requirements.filter((item) => item.trim() !== ""),

                process,
                duration,
                fee,
                icon,
                isPublished,
            };

            const result = initialData
                ? await updateServiceAction(initialData.id, data)
                : await createServiceAction(data);

            if (!result.success) {
                alert(result.message);

                return;
            }

            onSuccess();
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label>Nama Layanan</Label>

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Surat Domisili"
                />
            </div>

            <div className="space-y-2">
                <Label>Deskripsi</Label>

                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan layanan..."
                    rows={4}
                />
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label>Persyaratan</Label>

                    <Button type="button" size="sm" variant="outline" onClick={addRequirement}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {requirements.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={item}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                            placeholder="Contoh: Fotokopi KTP"
                        />

                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeRequirement(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <Label>Alur Pengurusan</Label>

                <Textarea
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    placeholder="Contoh: Datang ke kantor desa..."
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Estimasi Waktu</Label>

                    <Input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Contoh: 1 Hari"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Biaya</Label>

                    <Input
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="Contoh: Gratis"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Icon</Label>

                <Input
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="FileText"
                />
            </div>

            <div className="space-y-2">
                <Label>Status</Label>

                <Select
                    value={isPublished ? "published" : "draft"}
                    onValueChange={(value) => setIsPublished(value === "published")}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="published">Published</SelectItem>

                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Menyimpan..." : initialData ? "Update Layanan" : "Tambah Layanan"}
            </Button>
        </form>
    );
}
