"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TableSearchProps extends Omit<React.ComponentProps<"input">, "size" | "onChange"> {
    value: string;
    onValueChange?: (value: string) => void;
    onClear?: () => void;
    containerClassName?: string;
}

export const TableSearch = forwardRef<HTMLInputElement, TableSearchProps>(
    (
        {
            value,
            onValueChange,
            onClear,
            className,
            containerClassName,
            placeholder = "Cari data...",
            ...props
        },
        ref,
    ) => {
        return (
            <div className={cn("relative w-full max-w-sm", containerClassName)}>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    ref={ref}
                    value={value}
                    onChange={(event) => onValueChange?.(event.target.value)}
                    placeholder={placeholder}
                    className={cn("h-10 pl-10 pr-10", className)}
                    {...props}
                />

                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onClear}
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                        <X className="size-4" />
                    </Button>
                )}
            </div>
        );
    },
);

TableSearch.displayName = "TableSearch";
