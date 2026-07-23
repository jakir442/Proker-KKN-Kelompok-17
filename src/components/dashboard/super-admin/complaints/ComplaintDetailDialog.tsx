"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { IComplaint } from "@/models/complaint";
import { complaintResponseSchema, ComplaintResponseValues } from "@/validations/complaint.schema";
import { respondComplaintAction } from "@/actions/complaint/complaint";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ComplaintDetailDialogProps {
    complaint: IComplaint | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ComplaintDetailDialog({
    complaint,
    open,
    onOpenChange,
}: ComplaintDetailDialogProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<ComplaintResponseValues>({
        resolver: zodResolver(complaintResponseSchema),
        defaultValues: {
            status: "PENDING",
            response: "",
        },
    });

    useEffect(() => {
        if (!complaint) return;

        form.reset({
            status: complaint.status,
            response: complaint.response ?? "",
        });
    }, [complaint, form]);

    if (!complaint) return null;

    const onSubmit = (values: ComplaintResponseValues) => {
        startTransition(async () => {
            const result = await respondComplaintAction(complaint._id.toString(), values);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            onOpenChange(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detail Aspirasi & Pengaduan</DialogTitle>

                    <DialogDescription>
                        Tinjau laporan warga, ubah status, lalu berikan tanggapan resmi.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Informasi Pelapor */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Nomor Tiket</p>
                            <Badge variant="secondary" className="font-mono">
                                {complaint.ticketNumber}
                            </Badge>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Nama</p>
                            <p className="font-medium">{complaint.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Nomor HP</p>

                            <p className="font-medium">{complaint.phone || "-"}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>

                            <p className="font-medium">{complaint.email || "-"}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Kategori</p>

                            <Badge>{complaint.category}</Badge>
                        </div>
                    </div>

                    {/* Judul */}

                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Judul</p>

                        <p className="font-semibold">{complaint.title}</p>
                    </div>

                    {/* Deskripsi */}

                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Deskripsi</p>

                        <div className="rounded-md border p-4 whitespace-pre-wrap">
                            {complaint.description}
                        </div>
                    </div>

                    {/* Lampiran */}

                    {complaint.attachment && (
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Lampiran</p>

                            <a
                                href={complaint.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                Lihat Lampiran
                            </a>
                        </div>
                    )}

                    {/* Form Admin */}

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5 border-t pt-5"
                        >
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="PENDING">Pending</SelectItem>

                                                <SelectItem value="PROCESS">Diproses</SelectItem>

                                                <SelectItem value="DONE">Selesai</SelectItem>

                                                <SelectItem value="REJECTED">Ditolak</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="response"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tanggapan Desa</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={6}
                                                placeholder="Masukkan tanggapan resmi dari pemerintah desa..."
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Batal
                                </Button>

                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Menyimpan..." : "Simpan Tanggapan"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
