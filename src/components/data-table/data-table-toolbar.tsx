"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface Props<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: Props<TData>) {
    return (
        <div className="flex items-center justify-between py-4">
            <Input
                placeholder="Cari..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                className="max-w-sm"
            />
        </div>
    );
}
