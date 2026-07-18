"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        setLoading(true);

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            },
        );

        const data = await res.json();

        onChange(data.secure_url);

        setLoading(false);
    }

    return (
        <div className="space-y-4">
            {value && (
                <div className="relative h-56 w-full overflow-hidden rounded-lg border">
                    <Image src={value} alt="Preview" fill className="object-cover" />
                </div>
            )}

            <Button type="button" variant="outline">
                <label className="cursor-pointer">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Pilih Gambar
                        </>
                    )}

                    <input hidden type="file" accept="image/*" onChange={handleUpload} />
                </label>
            </Button>
        </div>
    );
}
