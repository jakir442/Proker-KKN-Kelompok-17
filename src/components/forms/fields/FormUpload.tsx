"use client";

import { useEffect, useMemo, useRef } from "react";
import { ImagePlus } from "lucide-react";

import { FormField } from "../FormField";
import { UploadDropzone } from "../upload/UploadDropzone";
import { UploadPreview } from "../upload/UploadPreview";

interface FormUploadProps {
    id?: string;
    label: string;
    value?: File | string | null;
    onChange: (file: File | null) => void;
    error?: string;
    helperText?: string;
    required?: boolean;
    accept?: string;
    disabled?: boolean;
    className?: string;
}

export function FormUpload({
    id,
    label,
    value,
    onChange,
    error,
    helperText,
    required,
    accept = "image/*",
    disabled,
    className,
}: FormUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const preview = useMemo(() => {
        if (!value) return null;

        return typeof value === "string" ? value : URL.createObjectURL(value);
    }, [value]);

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleFile(file: File | null) {
        if (!file) return;

        onChange(file);
    }

    function removeImage() {
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
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
                disabled={disabled}
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {preview ? (
                <UploadPreview
                    preview={preview}
                    onReplace={() => inputRef.current?.click()}
                    onRemove={removeImage}
                />
            ) : (
                <UploadDropzone
                    icon={ImagePlus}
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleFile}
                />
            )}
        </FormField>
    );
}
