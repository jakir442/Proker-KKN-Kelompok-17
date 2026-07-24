"use client";

import { forwardRef } from "react";
import { AlignLeft } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./FormField";
import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<typeof Textarea>;

interface FormTextareaProps extends TextareaProps {
    label: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    containerClassName?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
                    <div className="pointer-events-none absolute left-3 top-3 text-muted-foreground">
                        <AlignLeft className="size-4" />
                    </div>

                    <Textarea
                        ref={ref}
                        className={cn(
                            "min-h-28 resize-y pl-10 transition-all duration-200",
                            className,
                        )}
                        {...props}
                    />
                </div>
            </FormField>
        );
    },
);

FormTextarea.displayName = "FormTextarea";
