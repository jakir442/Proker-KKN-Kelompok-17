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
import {
    FormActions,
    FormGrid,
    FormHeader,
    FormInput,
    FormSection,
    FormSwitch,
    FormTextarea,
} from "@/components/forms";
import { CalendarDays, Clock3, MapPinned, Type, Image as ImageIcon, Eye } from "lucide-react";

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

    const {
        formState: { errors },
    } = form;

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
            <FormHeader
                icon={CalendarDays}
                title={event ? "Edit Agenda" : "Tambah Agenda"}
                description={
                    event
                        ? "Perbarui informasi agenda yang akan ditampilkan kepada masyarakat."
                        : "Lengkapi informasi agenda yang akan dipublikasikan di website desa."
                }
            />
            <FormSection
                title="Informasi Dasar"
                description="Data utama mengenai agenda."
                icon={CalendarDays}
            >
                <FormGrid>
                    <FormInput
                        id="title"
                        label="Judul Agenda"
                        required
                        icon={Type}
                        placeholder="Masukkan judul agenda"
                        error={errors.title?.message}
                        {...form.register("title")}
                    />

                    <FormInput
                        id="location"
                        label="Lokasi"
                        required
                        icon={MapPinned}
                        placeholder="Contoh: Aula Desa Cintanagara"
                        error={errors.location?.message}
                        {...form.register("location")}
                    />

                    <FormTextarea
                        id="description"
                        label="Deskripsi"
                        containerClassName="md:col-span-2"
                        className="min-h-36"
                        placeholder="Tuliskan deskripsi agenda..."
                        error={errors.description?.message}
                        {...form.register("description")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Media" description="Cover agenda." icon={ImageIcon}>
                <FormGrid>
                    <div className="md:col-span-2">
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
                </FormGrid>
            </FormSection>

            <FormSection
                title="Jadwal"
                description="Tanggal dan waktu pelaksanaan agenda."
                icon={Clock3}
            >
                <FormGrid>
                    <FormInput
                        id="startDate"
                        type="date"
                        label="Tanggal Mulai"
                        required
                        error={errors.startDate?.message}
                        {...form.register("startDate")}
                    />

                    <FormInput
                        id="startTime"
                        type="time"
                        label="Jam Mulai"
                        required
                        error={errors.startTime?.message}
                        {...form.register("startTime")}
                    />

                    <FormInput
                        id="endDate"
                        type="date"
                        label="Tanggal Selesai"
                        required
                        error={errors.endDate?.message}
                        {...form.register("endDate")}
                    />

                    <FormInput
                        id="endTime"
                        type="time"
                        label="Jam Selesai"
                        required
                        error={errors.endTime?.message}
                        {...form.register("endTime")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Publikasi" description="Pengaturan visibilitas agenda." icon={Eye}>
                <FormGrid>
                    <FormSwitch
                        id="published"
                        label="Publikasikan"
                        description="Agenda akan tampil pada halaman publik."
                        checked={form.watch("published")}
                        onCheckedChange={(checked) => form.setValue("published", checked)}
                    />
                </FormGrid>
            </FormSection>

            <div className="flex justify-end">
                <FormActions
                    isPending={form.formState.isSubmitting}
                    onCancel={onSuccess}
                    submitText={event ? "Simpan Perubahan" : "Simpan Agenda"}
                    pendingText="Menyimpan..."
                />
            </div>
        </form>
    );
}
