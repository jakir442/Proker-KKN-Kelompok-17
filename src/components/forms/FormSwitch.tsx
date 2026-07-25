"use client";

import { Switch } from "@/components/ui/switch";
import { FormField } from "./FormField";
import { cn } from "@/lib/utils";

interface FormSwitchProps {
    id: string;
    label: string;
    description?: string;
    helperText?: string;
    error?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    activeText?: string;
    inactiveText?: string;
}

export function FormSwitch({
    id,
    label,
    description,
    helperText,
    error,
    checked,
    onCheckedChange,
    disabled,
    required,
    className,
    activeText = "Aktif",
    inactiveText = "Nonaktif",
}: FormSwitchProps) {
    return (
        <FormField
            htmlFor={id}
            label={label}
            required={required}
            helperText={helperText}
            error={error}
            className={className}
        >
            <div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 transition-colors hover:border-primary/40">
                <div className="min-w-0 flex-1">
                    {description && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}

                    <p
                        className={cn(
                            "mt-1 text-sm font-medium transition-colors",
                            checked
                                ? "text-emerald-600"
                                : "text-muted-foreground"
                        )}
                    >
                        {checked ? activeText : inactiveText}
                    </p>
                </div>

                <Switch
                    id={id}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                />
            </div>
        </FormField>
    );
}