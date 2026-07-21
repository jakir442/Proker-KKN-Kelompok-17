"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    autoFocus?: boolean;
    debounce?: number;
    onClear?: () => void;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Cari...",
    className,
    disabled,
    loading = false,
    autoFocus = false,
    debounce = 0,
    onClear,
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        if (debounce <= 0) {
            onChange(localValue);
            return;
        }

        const timer = setTimeout(() => {
            onChange(localValue);
        }, debounce);

        return () => clearTimeout(timer);
    }, [localValue, debounce, onChange]);

    return (
        <div role="search" className={cn("relative w-full", className)}>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300 peer-focus:text-primary" />

            <input
                type="search"
                value={localValue}
                autoFocus={autoFocus}
                disabled={disabled}
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        setLocalValue("");
                        onChange("");
                        onClear?.();
                    }
                }}
                onChange={(e) => setLocalValue(e.target.value)}
                className="peer h-14 w-full rounded-full border border-border/60 bg-background pl-14 pr-14 text-base shadow-sm transition-all duration-300 outline-none placeholder:text-muted-foreground/70 hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {loading ? (
                <Loader2 className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary" />
            ) : (
                localValue && (
                    <button
                        type="button"
                        aria-label="Hapus pencarian"
                        onClick={() => {
                            setLocalValue("");
                            onChange("");
                            onClear?.();
                        }}
                        className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )
            )}
        </div>
    );
}
