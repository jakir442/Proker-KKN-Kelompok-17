"use client";

import { CheckCircle2, Copy } from "lucide-react";

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    ticketNumber: string;
    onOpenChange: (open: boolean) => void;
}

export function ComplaintSuccessDialog({ open, ticketNumber, onOpenChange }: Props) {
    async function copyTicket() {
        await navigator.clipboard.writeText(ticketNumber);

        toast.success("Nomor tiket berhasil disalin.");
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                    </div>

                    <DialogTitle className="text-center">Pengaduan Berhasil Dikirim</DialogTitle>

                    <DialogDescription className="text-center">
                        Simpan nomor tiket berikut untuk melihat perkembangan pengaduan Anda.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border bg-muted p-5">
                    <p className="text-center text-sm text-muted-foreground">Nomor Tiket</p>

                    <p className="mt-2 text-center text-xl font-bold tracking-widest">
                        {ticketNumber}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={copyTicket}>
                        <Copy className="mr-2 h-4 w-4" />
                        Salin
                    </Button>

                    <Button className="flex-1" onClick={() => onOpenChange(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
