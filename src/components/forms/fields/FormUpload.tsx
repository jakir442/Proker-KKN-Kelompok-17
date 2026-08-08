"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Loader2, Pencil, RotateCcw, Trash2, Upload } from "lucide-react";

import { FormField } from "../FormField";
import { UploadDropzone } from "../upload/UploadDropzone";
import type { PhotoSettings } from "@/validations/village-profile.schema";

interface FormUploadProps {
    id?: string;
    label: string;

    value?: File | null;
    previewUrl?: string;

    photoSettings?: PhotoSettings;

    onChange: (file: File | null) => void;
    onUploaded?: (url: string) => void;
    onPhotoSettingsChange?: (settings: PhotoSettings) => void;

    folder?: string;

    error?: string;
    helperText?: string;
    required?: boolean;
    accept?: string;
    disabled?: boolean;
    className?: string;

    aspectRatio?: "1/1" | "4/5" | "16/9";
}

export function FormUpload({
    id,
    label,
    value,
    previewUrl,
    photoSettings,
    onChange,
    onUploaded,
    onPhotoSettingsChange,
    folder,
    error,
    helperText,
    required,
    accept = "image/*",
    disabled,
    className,
    aspectRatio = "1/1",
}: FormUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [editing, setEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [zoom, setZoom] = useState(photoSettings?.zoom ?? 1);
    const [positionX, setPositionX] = useState(photoSettings?.positionX ?? 50);
    const [positionY, setPositionY] = useState(photoSettings?.positionY ?? 50);

    /**
     * Object URL hanya dibuat untuk File baru.
     */
    const objectUrl = useMemo(() => {
        if (!value) {
            return null;
        }

        return URL.createObjectURL(value);
    }, [value]);

    /**
     * Bersihkan Object URL.
     */
    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    /**
     * Prioritas preview:
     *
     * 1. File baru
     * 2. URL Cloudinary dari database
     */
    const preview = objectUrl ?? previewUrl ?? null;

    const aspectClass = {
        "1/1": "aspect-square",
        "4/5": "aspect-[4/5]",
        "16/9": "aspect-video",
    }[aspectRatio];

    /**
     * Update pengaturan foto.
     */
    function updatePhotoSettings(settings: Partial<PhotoSettings>) {
        const nextSettings: PhotoSettings = {
            zoom: settings.zoom ?? zoom,
            positionX: settings.positionX ?? positionX,
            positionY: settings.positionY ?? positionY,
        };

        setZoom(nextSettings.zoom);
        setPositionX(nextSettings.positionX);
        setPositionY(nextSettings.positionY);

        onPhotoSettingsChange?.(nextSettings);
    }

    /**
     * Upload ke Cloudinary.
     */
    async function uploadToCloudinary(file: File) {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error("Konfigurasi Cloudinary belum tersedia.");
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        if (folder) {
            formData.append("folder", folder);
        }

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload gambar ke Cloudinary gagal.");
        }

        const data = await response.json();

        if (!data.secure_url) {
            throw new Error("Cloudinary tidak mengembalikan URL gambar.");
        }

        return data.secure_url as string;
    }

    /**
     * Handle file baru.
     */
    async function handleFile(file: File | null) {
        if (!file || uploading) {
            return;
        }

        try {
            setUploading(true);

            /**
             * Tampilkan file secara lokal.
             */
            onChange(file);

            /**
             * Foto baru menggunakan
             * posisi default.
             */
            updatePhotoSettings({
                zoom: 1,
                positionX: 50,
                positionY: 50,
            });

            /**
             * Upload ke Cloudinary.
             */
            const url = await uploadToCloudinary(file);

            /**
             * Simpan URL ke React Hook Form.
             */
            onUploaded?.(url);
        } catch (error) {
            console.error("[FormUpload] Upload:", error);

            onChange(null);

            alert(error instanceof Error ? error.message : "Gagal mengunggah gambar.");
        } finally {
            setUploading(false);
        }
    }

    /**
     * Hapus foto.
     */
    function removeImage() {
        if (uploading) {
            return;
        }

        onChange(null);

        updatePhotoSettings({
            zoom: 1,
            positionX: 50,
            positionY: 50,
        });

        setEditing(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function openFilePicker() {
        if (disabled || uploading) {
            return;
        }

        inputRef.current?.click();
    }

    function resetAdjustment() {
        updatePhotoSettings({
            zoom: 1,
            positionX: 50,
            positionY: 50,
        });
    }

    return (
        <FormField
            htmlFor={id}
            label={label}
            required={required}
            helperText={helperText}
            error={error}
            className={className}
        >
            <input
                ref={inputRef}
                id={id}
                type="file"
                hidden
                accept={accept}
                disabled={disabled || uploading}
                onChange={(event) => {
                    void handleFile(event.target.files?.[0] ?? null);

                    /**
                     * Supaya file yang sama
                     * bisa dipilih kembali.
                     */
                    event.target.value = "";
                }}
            />

            {preview ? (
                <div className="w-full max-w-[360px] space-y-3">
                    {/* Preview */}
                    <div
                        className={`relative w-full overflow-hidden rounded-2xl border bg-muted ${aspectClass}`}
                    >
                        <img
                            src={preview}
                            alt={label}
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{
                                objectPosition: `${positionX}% ${positionY}%`,
                                transform: `scale(${zoom})`,
                            }}
                        />

                        {/* Loading */}
                        {uploading && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2 text-white">
                                    <Loader2 className="h-7 w-7 animate-spin" />

                                    <span className="text-sm font-medium">Mengunggah foto...</span>
                                </div>
                            </div>
                        )}

                        {/* Bottom action */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-14">
                            <button
                                type="button"
                                disabled={disabled || uploading}
                                onClick={() => setEditing(true)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/70 px-3 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Tampilan Foto
                            </button>
                        </div>

                        {/* Delete */}
                        <button
                            type="button"
                            disabled={disabled || uploading}
                            onClick={removeImage}
                            aria-label="Hapus foto"
                            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-destructive shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Editor */}
                    {editing && (
                        <div className="space-y-5 rounded-2xl border bg-card p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold">Sesuaikan Foto</p>

                                    <p className="text-xs text-muted-foreground">
                                        Atur posisi dan zoom foto.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={resetAdjustment}
                                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Reset
                                </button>
                            </div>

                            {/* Editor preview */}
                            <div
                                className={`relative w-full overflow-hidden rounded-xl border bg-muted ${aspectClass}`}
                            >
                                <img
                                    src={preview}
                                    alt={`Preview ${label}`}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    style={{
                                        objectPosition: `${positionX}% ${positionY}%`,
                                        transform: `scale(${zoom})`,
                                    }}
                                />

                                <div className="pointer-events-none absolute inset-0 border-2 border-white/60" />
                            </div>

                            {/* Controls */}
                            <div className="space-y-4">
                                {/* Zoom */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor={`${id}-zoom`}
                                            className="text-xs font-medium"
                                        >
                                            Zoom
                                        </label>

                                        <span className="text-xs text-muted-foreground">
                                            {zoom.toFixed(1)}x
                                        </span>
                                    </div>

                                    <input
                                        id={`${id}-zoom`}
                                        type="range"
                                        min="1"
                                        max="2"
                                        step="0.05"
                                        value={zoom}
                                        onChange={(event) =>
                                            updatePhotoSettings({
                                                zoom: Number(event.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* Horizontal */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor={`${id}-position-x`}
                                            className="text-xs font-medium"
                                        >
                                            Posisi Horizontal
                                        </label>

                                        <span className="text-xs text-muted-foreground">
                                            {positionX}%
                                        </span>
                                    </div>

                                    <input
                                        id={`${id}-position-x`}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={positionX}
                                        onChange={(event) =>
                                            updatePhotoSettings({
                                                positionX: Number(event.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* Vertical */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor={`${id}-position-y`}
                                            className="text-xs font-medium"
                                        >
                                            Posisi Vertikal
                                        </label>

                                        <span className="text-xs text-muted-foreground">
                                            {positionY}%
                                        </span>
                                    </div>

                                    <input
                                        id={`${id}-position-y`}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={positionY}
                                        onChange={(event) =>
                                            updatePhotoSettings({
                                                positionY: Number(event.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Done */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                                >
                                    Selesai
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Replace */}
                    <button
                        type="button"
                        disabled={disabled || uploading}
                        onClick={openFilePicker}
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                        {uploading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Upload className="h-3.5 w-3.5" />
                        )}

                        {uploading ? "Mengunggah..." : "Ganti foto"}
                    </button>
                </div>
            ) : (
                <div className={`w-full max-w-[360px] ${aspectClass}`}>
                    <UploadDropzone
                        icon={ImagePlus}
                        disabled={disabled || uploading}
                        onClick={openFilePicker}
                        onDrop={handleFile}
                    />
                </div>
            )}
        </FormField>
    );
}
