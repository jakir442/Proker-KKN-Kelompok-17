"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
    {
        value: "newest",
        label: "Terbaru",
    },
    {
        value: "oldest",
        label: "Terlama",
    },
    {
        value: "name",
        label: "Nama A-Z",
    },
    {
        value: "rating",
        label: "Rating Tertinggi",
    },
];

export function UMKMSort() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const value = searchParams.get("sort") ?? "newest";

    function handleChange(sort: string | null) {
        const nextSort = sort ?? "newest";
        const params = new URLSearchParams(searchParams.toString());

        if (nextSort === "newest") {
            params.delete("sort");
        } else {
            params.set("sort", nextSort);
        }

        params.delete("page");

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="h-12 w-full rounded-2xl sm:w-60">
                <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-emerald-600" />
                    <SelectValue />
                </div>
            </SelectTrigger>

            <SelectContent>
                {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
