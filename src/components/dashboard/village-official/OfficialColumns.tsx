"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface OfficialColumn {
    id: string;

    name: string;

    position: string;

    photo?: string;

    phone?: string;

    email?: string;

    order: number;

    isActive: boolean;
}

interface Props {
    onEdit: (official: OfficialColumn) => void;

    onDelete: (official: OfficialColumn) => void;
}

export function columns({ onEdit, onDelete }: Props): ColumnDef<OfficialColumn>[] {
    return [
        {
            accessorKey: "photo",
            header: "Foto",
            cell: ({ row }) => {
                const { photo, name } = row.original;

                return (
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={photo} alt={name} />

                        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                );
            },
        },

        {
            accessorKey: "name",
            header: "Nama",
        },

        {
            accessorKey: "position",
            header: "Jabatan",
        },

        {
            accessorKey: "phone",
            header: "Telepon",
            cell: ({ row }) => row.original.phone || "-",
        },

        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => row.original.email || "-",
        },

        {
            accessorKey: "order",
            header: "Urutan",
        },

        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.original.isActive ? "default" : "secondary"}>
                    {row.original.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
            ),
        },

        {
            id: "actions",
            header: "",
            enableSorting: false,

            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
}
