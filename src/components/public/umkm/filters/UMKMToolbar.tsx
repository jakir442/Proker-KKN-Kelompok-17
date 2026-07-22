"use client";

import { SlidersHorizontal } from "lucide-react";

import { UMKMSearch } from "./UMKMSearch";
import { UMKMCategoryFilter } from "./UMKMCategoryFilter";
import { UMKMSort } from "./UMKMSort";

interface Props {
    categories: string[];
}

export function UMKMToolbar({ categories }: Props) {
    return (
        <section className="mb-12 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <UMKMSearch />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                        <span>Filter & Urutkan</span>
                    </div>
                    <UMKMCategoryFilter categories={categories} />
                    <UMKMSort />
                </div>
            </div>
        </section>
    );
}