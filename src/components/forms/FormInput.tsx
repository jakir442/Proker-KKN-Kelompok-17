"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<typeof Input>;

interface FormInputProps extends InputProps {
    label: string;

    helperText?: string;

    error?: string;

    required?: boolean;

    icon?: LucideIcon;

    containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        { label, helperText, error, required, icon: Icon, className, containerClassName, ...props },
        ref,
    ) => {
        return (
            <FormField
                label={label}
                htmlFor={props.id}
                required={required}
                helperText={helperText}
                error={error}
                className={containerClassName}
            >
                <div className="relative">
                    {Icon && (
                        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                            <Icon className="size-4" />
                        </div>
                    )}

                    <Input
                        ref={ref}
                        className={cn(Icon && "pl-10", "transition-all duration-200", className)}
                        {...props}
                    />
                </div>
            </FormField>
        );
    },
);

FormInput.displayName = "FormInput";
