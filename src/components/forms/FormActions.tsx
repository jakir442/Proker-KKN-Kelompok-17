"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormActionsProps {
    onCancel?: () => void;

    isPending?: boolean;

    submitText?: string;

    pendingText?: string;

    cancelText?: string;

    className?: string;

    sticky?: boolean;
}

export function FormActions({
    onCancel,
    isPending = false,
    submitText = "Simpan",
    pendingText = "Menyimpan...",
    cancelText = "Batal",
    className,
    sticky = false,
}: FormActionsProps) {
    return (
        <div
            className={cn(
                "flex flex-col-reverse gap-3 border-t bg-background pt-6 sm:flex-row sm:justify-end",
                sticky &&
                    "sticky bottom-0 z-20 -mx-6 mt-8 border-t bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
                className,
            )}
        >
            {onCancel && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isPending}
                    className="w-full sm:w-auto"
                >
                    {cancelText}
                </Button>
            )}

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                {isPending ? pendingText : submitText}
            </Button>
        </div>
    );
}
