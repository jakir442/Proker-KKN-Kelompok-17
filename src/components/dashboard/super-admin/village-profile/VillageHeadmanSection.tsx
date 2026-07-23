"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/upload/image-upload";

interface Props {
    headmanName: string;
    headmanPhoto: string;
    headmanGreeting: string;

    setHeadmanName: (value: string) => void;
    setHeadmanPhoto: (value: string) => void;
    setHeadmanGreeting: (value: string) => void;
}

export function VillageHeadmanSection({
    headmanName,
    headmanPhoto,
    headmanGreeting,
    setHeadmanName,
    setHeadmanPhoto,
    setHeadmanGreeting,
}: Props) {
    return (
        <div className="space-y-5 rounded-lg border p-5">
            <div>
                <h2 className="text-lg font-semibold">Kepala Desa</h2>

                <p className="text-sm text-muted-foreground">
                    Informasi kepala desa yang akan ditampilkan pada halaman profil.
                </p>
            </div>

            <div className="space-y-2">
                <Label>Nama Kepala Desa</Label>

                <Input
                    value={headmanName}
                    onChange={(e) => setHeadmanName(e.target.value)}
                    placeholder="Nama Kepala Desa"
                />
            </div>

            <div className="space-y-2">
                <Label>Foto Kepala Desa</Label>

                <ImageUpload value={headmanPhoto} onChange={setHeadmanPhoto} />
            </div>

            <div className="space-y-2">
                <Label>Sambutan Kepala Desa</Label>

                <Textarea
                    rows={8}
                    value={headmanGreeting}
                    onChange={(e) => setHeadmanGreeting(e.target.value)}
                    placeholder="Tuliskan sambutan kepala desa..."
                />
            </div>
        </div>
    );
}
