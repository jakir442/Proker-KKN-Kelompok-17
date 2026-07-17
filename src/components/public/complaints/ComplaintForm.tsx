"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createComplaintSchema, CreateComplaintValues } from "@/validations/complaint.schema";

import { createComplaintAction } from "@/actions/complaint/complaint";
import { ImageUpload } from "@/components/upload/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ComplaintSuccessDialog } from "./ComplaintSuccess";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SuccessState {
    open: boolean;
    ticketNumber: string;
}

export function ComplaintForm() {
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState<SuccessState>({
        open: false,
        ticketNumber: "",
    });

    const form = useForm<CreateComplaintValues>({
        resolver: zodResolver(createComplaintSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            category: "INFRASTRUKTUR",
            title: "",
            description: "",
            attachment: "",
        },
    });

    const onSubmit: SubmitHandler<CreateComplaintValues> = async (values) => {
        try {
            setLoading(true);

            const result = await createComplaintAction(values);

            if (!result.success) {
                toast.error(result.message);

                return;
            }

            toast.success(result.message);

            form.reset({
                name: "",
                phone: "",
                email: "",
                category: "INFRASTRUKTUR",
                title: "",
                description: "",
                attachment: "",
            });

            setSuccess({
                open: true,
                ticketNumber: result.ticketNumber ?? "",
            });
        } catch (error) {
            console.error(error);

            toast.error("Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Form Aspirasi & Pengaduan</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Nama */}

                        <div className="space-y-2">
                            <Label>Nama Lengkap</Label>

                            <Input
                                placeholder="Masukkan nama lengkap..."
                                {...form.register("name")}
                            />

                            {form.formState.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* No HP */}

                        <div className="space-y-2">
                            <Label>Nomor HP</Label>

                            <Input placeholder="08xxxxxxxxxx" {...form.register("phone")} />

                            {form.formState.errors.phone && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}

                        <div className="space-y-2">
                            <Label>Email</Label>

                            <Input
                                type="email"
                                placeholder="email@example.com"
                                {...form.register("email")}
                            />

                            {form.formState.errors.email && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Kategori */}

                        <div className="space-y-2">
                            <Label>Kategori</Label>

                            <Select
                                value={form.watch("category")}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "category",
                                        value as CreateComplaintValues["category"],
                                        {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        },
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="INFRASTRUKTUR">Infrastruktur</SelectItem>

                                    <SelectItem value="PELAYANAN">Pelayanan</SelectItem>

                                    <SelectItem value="LINGKUNGAN">Lingkungan</SelectItem>

                                    <SelectItem value="SOSIAL">Sosial</SelectItem>

                                    <SelectItem value="LAINNYA">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>

                            {form.formState.errors.category && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Judul */}

                        <div className="space-y-2">
                            <Label>Judul Pengaduan</Label>

                            <Input
                                placeholder="Masukkan judul pengaduan..."
                                {...form.register("title")}
                            />

                            {form.formState.errors.title && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}

                        <div className="space-y-2">
                            <Label>Deskripsi</Label>

                            <Textarea
                                rows={6}
                                placeholder="Jelaskan aspirasi atau pengaduan secara lengkap..."
                                {...form.register("description")}
                            />

                            {form.formState.errors.description && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Lampiran */}

                        <div className="space-y-2">
                            <Label>Lampiran (Opsional)</Label>

                            <ImageUpload
                                value={form.watch("attachment")}
                                onChange={(url: string) =>
                                    form.setValue("attachment", url, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                            />

                            {form.formState.errors.attachment && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.attachment.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading} className="min-w-[180px]">
                                {loading ? "Mengirim..." : "Kirim Pengaduan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <ComplaintSuccessDialog
                open={success.open}
                ticketNumber={success.ticketNumber}
                onOpenChange={(open: boolean) =>
                    setSuccess((prev) => ({
                        ...prev,
                        open,
                    }))
                }
            />
        </>
    );
}
