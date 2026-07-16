"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createEventAction, updateEventAction } from "@/actions/events/events";
import { ImageUpload } from "@/components/upload/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EventColumn } from "./event-columns";
import { EventFormValues, eventSchema } from "@/validations/event.schema";

interface Props {
    mode: "create" | "edit";
    event?: EventColumn;
    onSuccess?: () => void;
}

export function EventForm({ mode, event, onSuccess }: Props) {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),

        defaultValues: {
            title: "",
            description: "",
            location: "",
            coverImage: "",

            startDate: "",
            startTime: "",

            endDate: "",
            endTime: "",

            published: false,
        },
    });

    useEffect(() => {
        if (event) {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);

            form.reset({
                title: event.title,
                description: event.description,
                location: event.location,
                coverImage: event.coverImage,

                startDate: start.toISOString().split("T")[0],
                startTime: start.toTimeString().slice(0, 5),

                endDate: end.toISOString().split("T")[0],
                endTime: end.toTimeString().slice(0, 5),

                published: event.published,
            });
        } else {
            form.reset({
                title: "",
                description: "",
                location: "",
                coverImage: "",

                startDate: "",
                startTime: "",

                endDate: "",
                endTime: "",

                published: false,
            });
        }
    }, [event, form]);

    const onSubmit: SubmitHandler<EventFormValues> = async (values) => {
        const payload = {
            title: values.title,
            description: values.description,
            location: values.location,
            coverImage: values.coverImage ?? "",

            startDate: new Date(`${values.startDate}T${values.startTime}`),
            endDate: new Date(`${values.endDate}T${values.endTime}`),

            published: values.published,
        };

        const result =
            mode === "create"
                ? await createEventAction(payload)
                : await updateEventAction(event!.id, payload);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        if (mode === "create") {
            form.reset();
        }

        onSuccess?.();
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium">Judul Agenda</label>

                <Input placeholder="Masukkan judul agenda..." {...form.register("title")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Lokasi</label>

                <Input placeholder="Masukkan lokasi kegiatan..." {...form.register("location")} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Cover Agenda</label>

                <ImageUpload
                    value={form.watch("coverImage")}
                    onChange={(url: string) =>
                        form.setValue("coverImage", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">Tanggal Mulai</label>

                    <Input type="date" {...form.register("startDate")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Jam Mulai</label>

                    <Input type="time" {...form.register("startTime")} />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">Tanggal Selesai</label>

                    <Input type="date" {...form.register("endDate")} />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Jam Selesai</label>

                    <Input type="time" {...form.register("endTime")} />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Deskripsi</label>

                <Textarea
                    rows={8}
                    placeholder="Tuliskan deskripsi agenda..."
                    {...form.register("description")}
                />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="font-medium">Publish</p>

                    <p className="text-sm text-muted-foreground">
                        Agenda akan ditampilkan pada halaman publik.
                    </p>
                </div>

                <Switch
                    checked={form.watch("published")}
                    onCheckedChange={(checked) =>
                        form.setValue("published", checked, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Menyimpan..."
                        : mode === "create"
                          ? "Simpan Agenda"
                          : "Perbarui Agenda"}
                </Button>
            </div>
        </form>
    );
}
