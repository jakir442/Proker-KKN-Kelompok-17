"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { OfficialColumn } from "./OfficialColumns";

interface OfficialActionsProps {
    official: OfficialColumn;
    onEdit: () => void;
    onDelete: () => void;
}

export function OfficialActions({ onEdit, onDelete }: OfficialActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                }
            />

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
