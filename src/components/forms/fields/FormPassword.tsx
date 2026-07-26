"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "../FormField";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<typeof Input>;

interface FormPasswordProps extends InputProps {
    label: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    containerClassName?: string;
}

export const FormPassword = forwardRef<HTMLInputElement, FormPasswordProps>(
    ({ label, helperText, error, required, className, containerClassName, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

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
                        <KeyRound className="size-4" />
                    </div>

                    <Input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        className={cn("h-11 pl-10 pr-11 transition-all duration-200", className)}
                        {...props}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-1 top-1 size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}

                        <span className="sr-only">
                            {showPassword ? "Sembunyikan password" : "Lihat password"}
                        </span>
                    </Button>
                </div>
            </FormField>
        );
    },
);

FormPassword.displayName = "FormPassword";
