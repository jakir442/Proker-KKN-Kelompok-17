"use client";

import { forwardRef } from "react";
import { Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<typeof Input>;

interface FormPhoneProps extends Omit<InputProps, "type"> {
    label: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    containerClassName?: string;
}

export const FormPhone = forwardRef<HTMLInputElement, FormPhoneProps>(
    ({ label, helperText, error, required, className, containerClassName, ...props }, ref) => {
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
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                        <Phone className="size-4" />
                    </div>

                    <Input
                        ref={ref}
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        className={cn("h-11 pl-10 transition-all duration-200", className)}
                        {...props}
                    />
                </div>
            </FormField>
        );
    },
);

FormPhone.displayName = "FormPhone";
