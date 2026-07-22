"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    categories: string[];
}

export function UMKMCategoryFilter({ categories }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const value = searchParams.get("category") ?? "ALL";

    function handleChange(category: string | null) {
        const params = new URLSearchParams(searchParams.toString());

        if (!category || category === "ALL") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        params.delete("page");

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="h-12 w-full rounded-2xl sm:w-56">
                <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="ALL">Semua Kategori</SelectItem>

                {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}