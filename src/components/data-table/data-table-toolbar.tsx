"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchColumn: string;
    placeholder?: string;
}

export function DataTableToolbar<TData>({
    table,
    searchColumn,
    placeholder,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between py-4">
            <Input
                placeholder={placeholder ?? "Cari..."}
                value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(searchColumn)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
        </div>
    );
}
