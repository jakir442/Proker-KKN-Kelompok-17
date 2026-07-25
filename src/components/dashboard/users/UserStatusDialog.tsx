"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Power } from "lucide-react";

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

import type { UserListItem } from "@/types/user-list";
import { updateUserStatusAction } from "@/actions/user/update-user-status";

interface UserStatusDialogProps {
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserStatusDialog({
    user,
    open,
    onOpenChange,
}: UserStatusDialogProps) {
    const [isPending, startTransition] = useTransition();

    if (!user) return null;


    function handleSubmit() {
        if (!user) return;
        startTransition(async () => {
            const result = await updateUserStatusAction({
                id: user.id,
                isActive: !user.isActive,
            });


            if (result.success) {
                toast.success(result.message);
                onOpenChange(false);
                return;
            }


            toast.error(result.message);
        });
    }


    const nextStatus = user.isActive ? "Nonaktifkan" : "Aktifkan";


    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent className="max-w-md">

                <AlertDialogHeader>

                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Power className="size-6" />
                    </div>


                    <AlertDialogTitle>
                        {nextStatus} Pengguna?
                    </AlertDialogTitle>


                    <AlertDialogDescription>
                        Apakah Anda yakin ingin{" "}
                        <strong>
                            {nextStatus.toLowerCase()}
                        </strong>{" "}
                        akun{" "}
                        <strong>
                            {user.fullName}
                        </strong>
                        ?
                    </AlertDialogDescription>

                </AlertDialogHeader>


                <AlertDialogFooter>

                    <AlertDialogCancel disabled={isPending}>
                        Batal
                    </AlertDialogCancel>


                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleSubmit}
                    >
                        {isPending
                            ? "Memproses..."
                            : nextStatus}
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}