"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function NewsPagination({ currentPage, totalPages, onPageChange }: NewsPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-14 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        className="h-10 w-10 rounded-xl"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
