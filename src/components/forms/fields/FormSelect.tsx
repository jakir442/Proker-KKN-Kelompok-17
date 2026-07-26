"use client";

import { LucideIcon } from "lucide-react";

import { FormField } from "../FormField";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface FormSelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    id?: string;
    label: string;
    value?: string;
    placeholder?: string;
    options: FormSelectOption[];
    onValueChange: (value: string) => void;
    required?: boolean;
    helperText?: string;
    error?: string;
    icon?: LucideIcon;
    className?: string;
    containerClassName?: string;
}

export function FormSelect({
    id,
    label,
    value,
    placeholder = "Pilih...",
    options,
    onValueChange,
    required,
    helperText,
    error,
    icon: Icon,
    className,
    containerClassName,
}: FormSelectProps) {
    return (
        <FormField
            htmlFor={id}
            label={label}
            required={required}
            helperText={helperText}
            error={error}
            className={containerClassName}
        >
            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center text-muted-foreground">
                        <Icon className="size-4" />
                    </div>
                )}

                <Select
                    value={value}
                    onValueChange={(value) => {
                        onValueChange(value ?? "");
                    }}
                >
                    <SelectTrigger
                        id={id}
                        className={cn(Icon && "pl-10", "transition-all duration-200", className)}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </FormField>
    );
}
