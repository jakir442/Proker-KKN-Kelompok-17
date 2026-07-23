"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    totalPages: number;
}

export function TourismPagination({ page, totalPages }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) {
        return null;
    }

    function navigate(nextPage: number) {
        const params = new URLSearchParams(searchParams.toString());
        if (nextPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(nextPage));
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    return (
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => navigate(page - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: end - start + 1 }, (_, index) => {
                const current = start + index;

                return (
                    <Button
                        key={current}
                        variant={current === page ? "default" : "outline"}
                        className={current === page ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        onClick={() => navigate(current)}
                    >
                        {current}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => navigate(page + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
