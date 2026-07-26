"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";

import {
    DataTable,
    TableSearch,
    TableSelectFilter,
    TableToolbar,
    TableToolbarLeft,
    TableToolbarRight,
} from "@/components/data-display/table";

import { Button } from "@/components/ui/button";

import { AnnouncementTableData } from "@/types/announcement";

import { columns } from "./announcement-columns";
import { EditAnnouncementDialog } from "./EditAnnouncementDialog";
import { DeleteAnnouncementDialog } from "./delete-announcement-dialog";

interface Props {
    data: AnnouncementTableData[];

    search: string;
    category: string;
    status: string;

    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchClear: () => void;

    onCreate: () => void;

    onPublish: (announcement: AnnouncementTableData) => void;
}

export function AnnouncementTable({
    data,
    search,
    category,
    status,
    onSearchChange,
    onCategoryChange,
    onStatusChange,
    onSearchClear,
    onCreate,
    onPublish,
}: Props) {
    const [selected, setSelected] = useState<AnnouncementTableData | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (announcement) => {
                    setSelected(announcement);
                    setEditOpen(true);
                },
                onDelete: (announcement) => {
                    setSelected(announcement);
                    setDeleteOpen(true);
                },
                onPublish,
            }),
        [onPublish],
    );

    return (
        <>
            <DataTable
                columns={tableColumns}
                data={data}
                toolbar={
                    <TableToolbar>
                        <div className="flex flex-col gap-4">
                            <TableSearch
                                value={search}
                                onValueChange={onSearchChange}
                                onClear={onSearchClear}
                                placeholder="Cari pengumuman..."
                            />
                        </div>

                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                                <TableSelectFilter
                                    value={category}
                                    onValueChange={onCategoryChange}
                                    placeholder="Semua Kategori"
                                    items={[
                                        {
                                            label: "Umum",
                                            value: "Umum",
                                        },
                                        {
                                            label: "Pelayanan",
                                            value: "Pelayanan",
                                        },
                                        {
                                            label: "Kesehatan",
                                            value: "Kesehatan",
                                        },
                                        {
                                            label: "Pendidikan",
                                            value: "Pendidikan",
                                        },
                                        {
                                            label: "Darurat",
                                            value: "Darurat",
                                        },
                                        {
                                            label: "Lainnya",
                                            value: "Lainnya",
                                        },
                                    ]}
                                />

                                <TableSelectFilter
                                    value={status}
                                    onValueChange={onStatusChange}
                                    placeholder="Semua Status"
                                    items={[
                                        {
                                            label: "Dipublikasikan",
                                            value: "published",
                                            icon: Eye,
                                        },
                                        {
                                            label: "Draft",
                                            value: "draft",
                                            icon: EyeOff,
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <Button onClick={onCreate} className="w-full shrink-0 lg:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengumuman
                        </Button>
                    </TableToolbar>
                }
            />

            {selected && (
                <EditAnnouncementDialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    announcement={selected}
                />
            )}

            {selected && (
                <DeleteAnnouncementDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selected.id}
                />
            )}
        </>
    );
}
