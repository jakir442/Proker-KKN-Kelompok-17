"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UserPaginationProps {
    page: number;
    totalPages: number;
}

export function UserPagination({ page, totalPages }: UserPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function changePage(newPage: number) {
        const params = new URLSearchParams(searchParams.toString());

        if (newPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(newPage));
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
            <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Sebelumnya
            </Button>

            <p className="text-sm text-muted-foreground">
                Halaman <span className="font-semibold text-foreground">{page}</span> dari{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
            </p>

            <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => changePage(page + 1)}
            >
                Berikutnya
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
