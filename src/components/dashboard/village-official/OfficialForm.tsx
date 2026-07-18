"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { OfficialColumn } from "./OfficialColumns";
import { ImageUpload } from "@/components/upload/image-upload";
import { updateOfficialAction } from "@/actions/village-official/update-official";
import { createOfficialAction } from "@/actions/village-official/create-official";

interface Props {
    initialData?: OfficialColumn;
    onSuccess: () => void;
}

export function OfficialForm({ initialData, onSuccess }: Props) {
    const [pending, startTransition] = useTransition();
    const [name, setName] = useState(initialData?.name ?? "");
    const [position, setPosition] = useState(initialData?.position ?? "");
    const [photo, setPhoto] = useState(initialData?.photo ?? "");
    const [phone, setPhone] = useState(initialData?.phone ?? "");
    const [email, setEmail] = useState(initialData?.email ?? "");
    const [order, setOrder] = useState(initialData?.order.toString() ?? "1");
    const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const data = {
                name,
                position,
                photo,
                phone,
                email,
                order: Number(order),
                isActive,
            };

            const result = initialData
                ? await updateOfficialAction(initialData.id, data)
                : await createOfficialAction(data);

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
                <Label>Foto</Label>

                <ImageUpload value={photo} onChange={setPhoto} />
            </div>

            <div className="space-y-2">
                <Label>Nama</Label>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama perangkat desa"
                />
            </div>

            <div className="space-y-2">
                <Label>Jabatan</Label>

                <Input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Contoh: Sekretaris Desa"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Telepon</Label>

                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Email</Label>

                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Urutan</Label>

                    <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>

                    <Select
                        value={isActive ? "active" : "inactive"}
                        onValueChange={(value) => setIsActive(value === "active")}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>

                            <SelectItem value="inactive">Nonaktif</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
                {pending
                    ? "Menyimpan..."
                    : initialData
                      ? "Update Perangkat Desa"
                      : "Tambah Perangkat Desa"}
            </Button>
        </form>
    );
}
