"use client";

import { Check, LucideIcon } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export interface TableSelectFilterItem {
    label: string;
    value: string;
    icon?: LucideIcon;
    badge?: string;
}

interface TableSelectFilterProps {
    value: string;
    onValueChange: (value: string) => void;

    items: TableSelectFilterItem[];

    allValue?: string;
    label?: string;
    placeholder?: string;

    disabled?: boolean;

    className?: string;
    triggerClassName?: string;
}

export function TableSelectFilter({
    value,
    onValueChange,
    items,
    allValue = "all",
    label,
    placeholder = "Semua",
    disabled,
    className,
    triggerClassName,
}: TableSelectFilterProps) {
    return (
        <div className={cn("flex w-full flex-col gap-1.5", className)}>
            {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}

            <Select
                value={value}
                onValueChange={(value) => {
                    if (value) {
                        onValueChange(value);
                    }
                }}
                disabled={disabled}
            >
                <SelectTrigger className={cn("w-full", triggerClassName)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={allValue}>
                        <div className="flex items-center justify-between gap-3">
                            <span>{placeholder}</span>

                            {value === allValue && <Check className="size-4" />}
                        </div>
                    </SelectItem>

                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <SelectItem key={item.value} value={item.value}>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        {Icon && <Icon className="size-4 text-muted-foreground" />}

                                        <span>{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
