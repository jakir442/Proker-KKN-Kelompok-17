"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TOURISM_CATEGORIES } from "@/constants/tourism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TourismFilter() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const current = searchParams.get("category") ?? "ALL";

    function change(category: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (category === "ALL") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
                variant={current === "ALL" ? "default" : "outline"}
                onClick={() => change("ALL")}
            >
                Semua
            </Button>

            {TOURISM_CATEGORIES.map((item) => (
                <Button
                    key={item}
                    variant={current === item ? "default" : "outline"}
                    className={cn(current === item && "bg-primary hover:bg-primary/90")}
                    onClick={() => change(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
}
