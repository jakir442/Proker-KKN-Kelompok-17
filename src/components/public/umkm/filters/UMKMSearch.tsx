"use client";

import { useEffect, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function UMKMSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [keyword, setKeyword] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (keyword.trim()) {
                params.set("search", keyword.trim());
            } else {
                params.delete("search");
            }

            params.delete("page");

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                });
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [keyword, pathname, router, searchParams]);

    function clearSearch() {
        setKeyword("");
    }

    return (
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari UMKM, kategori, atau pemilik..."
                className="h-12 rounded-2xl border-slate-200 pl-12 pr-12 focus-visible:ring-emerald-500"
            />

            {keyword && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            {isPending && (
                <div className="absolute right-12 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            )}
        </div>
    );
}