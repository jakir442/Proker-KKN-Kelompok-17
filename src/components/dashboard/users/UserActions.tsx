"use client";

import { Eye, KeyRound, MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onToggleStatus?: () => void;
    onResetPassword?: () => void;
    onDelete?: () => void;
}

export function UserActions({
    onView,
    onEdit,
    onToggleStatus,
    onResetPassword,
    onDelete,
}: UserActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" className="rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                }
            />

            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={onView}>
                    <Eye className="mr-2 h-4 w-4" />
                    Lihat Detail
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onToggleStatus}>
                    <Power className="mr-2 h-4 w-4" />
                    Ubah Status
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onResetPassword}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Reset Password
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
