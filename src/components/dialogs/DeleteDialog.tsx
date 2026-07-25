"use client";

import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title?: string;
    description?: string;
    itemName?: string;

    confirmText?: string;
    cancelText?: string;

    isPending?: boolean;

    onConfirm: () => void;
}

export function DeleteDialog({
    open,
    onOpenChange,
    title = "Hapus Data",
    description = "Data yang dihapus tidak dapat dikembalikan.",
    itemName,
    confirmText = "Hapus",
    cancelText = "Batal",
    isPending = false,
    onConfirm,
}: DeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md overflow-hidden p-0">
                <div className="space-y-6 p-6">
                    <AlertDialogHeader className="items-start space-y-5">
                        <div className="flex size-14 items-center justify-center rounded-2xl border bg-muted">
                            <Trash2 className="size-6 text-destructive" />
                        </div>

                        <div className="space-y-2 text-left">
                            <AlertDialogTitle className="text-xl font-semibold">
                                {title}
                            </AlertDialogTitle>

                            <AlertDialogDescription className="leading-relaxed">
                                {description}
                            </AlertDialogDescription>
                        </div>

                        {itemName && (
                            <div className="w-full rounded-xl border bg-muted/40 p-4">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Data yang dipilih
                                </p>

                                <p className="mt-2 text-sm font-semibold text-foreground">
                                    {itemName}
                                </p>
                            </div>
                        )}
                    </AlertDialogHeader>
                </div>

                <AlertDialogFooter className="border-t bg-muted/20 px-6 py-6">
                    <AlertDialogCancel disabled={isPending}>
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isPending ? "Menghapus..." : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}