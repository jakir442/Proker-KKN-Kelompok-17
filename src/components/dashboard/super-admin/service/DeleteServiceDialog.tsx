"use client";

import { useTransition } from "react";

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

import { deleteServiceAction } from "@/actions/service/delete-service";


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}


export function DeleteServiceDialog({
    open,
    onOpenChange,
    id,
}: Props) {

    const [pending, startTransition] =
        useTransition();


    function handleDelete() {

        startTransition(async () => {

            const result =
                await deleteServiceAction(id);


            if (!result.success) {

                alert(result.message);

                return;
            }


            onOpenChange(false);

        });

    }



    return (

        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Hapus Layanan?
                    </AlertDialogTitle>


                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan.
                        Data layanan desa akan dihapus secara permanen.
                    </AlertDialogDescription>

                </AlertDialogHeader>


                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Batal
                    </AlertDialogCancel>


                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={pending}
                    >
                        {pending
                            ? "Menghapus..."
                            : "Hapus"}
                    </AlertDialogAction>

                </AlertDialogFooter>


            </AlertDialogContent>

        </AlertDialog>

    );
}