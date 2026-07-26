"use client";

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];

    title?: string;
    description?: string;

    toolbar?: ReactNode;
    footer?: ReactNode;

    className?: string;
    contentClassName?: string;

    stickyHeader?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    description,
    toolbar,
    footer,
    className,
    contentClassName,
    stickyHeader = false,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", className)}>
            {(title || description) && (
                <header className="border-b px-5 py-5 sm:px-6">
                    {title && <h2 className="text-lg font-semibold">{title}</h2>}

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    )}
                </header>
            )}

            {toolbar && <div className="border-b bg-muted/20 px-5 py-4 sm:px-6">{toolbar}</div>}

            <div className="p-5 sm:p-6">
                <div
                    className={cn(
                        "overflow-hidden rounded-xl border",
                        stickyHeader && "max-h-[70vh]",
                    )}
                >
                    <div
                        className={cn(
                            "overflow-x-auto",
                            stickyHeader && "overflow-auto",
                            contentClassName,
                        )}
                    >
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {footer && <footer className="border-t bg-muted/20 px-5 py-4 sm:px-6">{footer}</footer>}
        </section>
    );
}
