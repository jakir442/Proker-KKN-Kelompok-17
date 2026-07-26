"use client";

import * as React from "react";

import { Clock3 } from "lucide-react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { FormField } from "../FormField";

interface FormTimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    containerClassName?: string;
}

export const FormTimePicker = React.forwardRef<HTMLInputElement, FormTimePickerProps>(
    ({ id, label, error, helperText, required, containerClassName, className, ...props }, ref) => {
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
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        ref={ref}
                        id={id}
                        type="time"
                        step={300}
                        className={cn("pl-10", className)}
                        {...props}
                    />
                </div>
            </FormField>
        );
    },
);

FormTimePicker.displayName = "FormTimePicker";
