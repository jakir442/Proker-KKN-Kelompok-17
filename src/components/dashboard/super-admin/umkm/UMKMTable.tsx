"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { columns, UMKMColumn } from "./columns";
import { toggleUMKMActiveAction } from "@/actions/umkm/toggle-active";
import { toggleUMKMFeaturedAction } from "@/actions/umkm/toggle-featured";
import { DeleteUMKMDialog } from "./DeleteUMKMDialog";
import { EditUMKMDialog } from "./EditUMKMDialog";
import {
    DataTable,
    TableToolbar,
    TableToolbarLeft,
    TableToolbarRight,
    TableSearch,
    TableSelectFilter,
} from "@/components/data-display/table";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    CheckCircle2,
    XCircle,
    Plus,
    UtensilsCrossed,
    Shirt,
    Wheat,
    Beef,
    Hammer,
    BriefcaseBusiness,
    Store,
    MoreHorizontal,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";
interface Props {
    data: UMKMColumn[];

    search: string;
    category: string;
    status: string;

    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchClear: () => void;

    onCreate: () => void;

    onFeatured: (umkm: UMKMColumn) => void;
    onActive: (umkm: UMKMColumn) => void;
}

export function UMKMTable({
    data,
    search,
    category,
    status,
    onSearchChange,
    onCategoryChange,
    onStatusChange,
    onSearchClear,
    onCreate,
    onFeatured,
    onActive,
}: Props) {
    const router = useRouter();

    const [selected, setSelected] = useState<UMKMColumn | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (umkm) => {
                    setSelected(umkm);
                    setEditOpen(true);
                },

                onDelete: (umkm) => {
                    setSelected(umkm);
                    setDeleteOpen(true);
                },

                onFeatured: async (umkm) => {
                    const result = await toggleUMKMFeaturedAction(umkm.id);

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },

                onActive: async (umkm) => {
                    const result = await toggleUMKMActiveAction(umkm.id);

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },
            }),
        [router],
    );

    return (
        <>
            <DataTable
                columns={tableColumns}
                data={data}
                toolbar={
                    <TableToolbar>
                        <TableToolbarLeft>
                            <div className="w-full lg:flex-1">
                                <TableSearch
                                    value={search}
                                    onValueChange={onSearchChange}
                                    onClear={onSearchClear}
                                    placeholder="Cari UMKM..."
                                />
                            </div>

                            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
                                <TableSelectFilter
                                    value={category}
                                    onValueChange={onCategoryChange}
                                    placeholder="Semua Kategori"
                                    items={[
                                        {
                                            label: "Kuliner",
                                            value: "Kuliner",
                                            icon: UtensilsCrossed,
                                        },
                                        {
                                            label: "Fashion",
                                            value: "Fashion",
                                            icon: Shirt,
                                        },
                                        {
                                            label: "Pertanian",
                                            value: "Pertanian",
                                            icon: Wheat,
                                        },
                                        {
                                            label: "Peternakan",
                                            value: "Peternakan",
                                            icon: Beef,
                                        },
                                        {
                                            label: "Kerajinan",
                                            value: "Kerajinan",
                                            icon: Hammer,
                                        },
                                        {
                                            label: "Jasa",
                                            value: "Jasa",
                                            icon: BriefcaseBusiness,
                                        },
                                    ]}
                                />

                                <TableSelectFilter
                                    value={status}
                                    onValueChange={onStatusChange}
                                    placeholder="Semua Status"
                                    items={[
                                        {
                                            label: "Aktif",
                                            value: "ACTIVE",
                                            icon: CheckCircle2,
                                        },
                                        {
                                            label: "Nonaktif",
                                            value: "INACTIVE",
                                            icon: XCircle,
                                        },
                                    ]}
                                />
                            </div>
                        </TableToolbarLeft>

                        <TableToolbarRight>
                            <Button onClick={onCreate} className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah UMKM
                            </Button>
                        </TableToolbarRight>
                    </TableToolbar>
                }
            />

            {selected && (
                <EditUMKMDialog open={editOpen} onOpenChange={setEditOpen} umkm={selected} />
            )}

            {selected && (
                <DeleteUMKMDialog open={deleteOpen} onOpenChange={setDeleteOpen} id={selected.id} />
            )}
        </>
    );
}
