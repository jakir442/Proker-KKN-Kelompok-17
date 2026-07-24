"use client";

import type { ReactNode } from "react";

import { FormField } from "./FormField";

interface FormSelectProps {
    children: ReactNode;

    label: string;

    required?: boolean;

    helperText?: string;

    error?: string;

    className?: string;
}

export function FormSelect({
    children,
    label,
    required,
    helperText,
    error,
    className,
}: FormSelectProps) {
    return (
        <FormField
            label={label}
            required={required}
            helperText={helperText}
            error={error}
            className={className}
        >
            {children}
        </FormField>
    );
}
