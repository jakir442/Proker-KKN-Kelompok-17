"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function TourismSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }, 400);

    return (
        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                defaultValue={searchParams.get("search") ?? ""}
                placeholder="Cari destinasi wisata..."
                className="h-12 rounded-xl pl-11"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}
