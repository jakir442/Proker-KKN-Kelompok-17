"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AnnouncementFormValues, announcementSchema } from "@/validations/announcement.schema";
import {
    createAnnouncementAction,
    updateAnnouncementAction,
} from "@/actions/announcements/announcements";
import { ANNOUNCEMENT_CATEGORIES } from "@/constants/announcements";
import { ImageUpload } from "@/components/upload/image-upload";
import { AnnouncementTableData } from "@/types/announcement";
import {
    FormActions,
    FormGrid,
    FormHeader,
    FormInput,
    FormSection,
    FormSelect,
    FormSwitch,
    FormTextarea,
} from "@/components/forms";
import { Megaphone, Tag, Type, Image as ImageIcon, Eye, FileText } from "lucide-react";

interface Props {
    mode: "create" | "edit";
    announcement?: AnnouncementTableData;
    onSuccess?: () => void;
}

export function AnnouncementForm({ mode, announcement, onSuccess }: Props) {
    const form = useForm<AnnouncementFormValues>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: ANNOUNCEMENT_CATEGORIES[0],
            coverImage: "",
            published: false,
        },
    });

    const {
        formState: { errors },
    } = form;

    useEffect(() => {
        if (announcement) {
            form.reset({
                title: announcement.title,
                excerpt: announcement.excerpt,
                content: announcement.content,
                category: announcement.category as AnnouncementFormValues["category"],
                coverImage: announcement.coverImage,
                published: announcement.published,
            });
        } else {
            form.reset({
                title: "",
                excerpt: "",
                content: "",
                category: ANNOUNCEMENT_CATEGORIES[0],
                coverImage: "",
                published: false,
            });
        }
    }, [announcement, form]);

    const onSubmit: SubmitHandler<AnnouncementFormValues> = async (values) => {
        const result =
            mode === "create"
                ? await createAnnouncementAction({
                      ...values,
                      coverImage: values.coverImage ?? "",
                  })
                : await updateAnnouncementAction(announcement!.id, {
                      ...values,
                      coverImage: values.coverImage ?? "",
                  });

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
                icon={Megaphone}
                title={mode === "edit" ? "Edit Pengumuman" : "Tambah Pengumuman"}
                description={
                    mode === "edit"
                        ? "Perbarui informasi pengumuman yang akan ditampilkan kepada masyarakat."
                        : "Buat pengumuman baru yang akan dipublikasikan melalui website desa."
                }
            />
            <FormSection
                title="Informasi Dasar"
                description="Data utama pengumuman."
                icon={Megaphone}
            >
                <FormGrid>
                    <FormInput
                        id="title"
                        label="Judul"
                        required
                        icon={Type}
                        placeholder="Masukkan judul pengumuman"
                        error={errors.title?.message}
                        {...form.register("title")}
                    />

                    <FormSelect
                        id="category"
                        label="Kategori"
                        icon={Tag}
                        value={form.watch("category")}
                        error={errors.category?.message}
                        onValueChange={(value) =>
                            form.setValue("category", value as AnnouncementFormValues["category"], {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                        options={ANNOUNCEMENT_CATEGORIES.map((item) => ({
                            label: item,
                            value: item,
                        }))}
                    />

                    <FormTextarea
                        id="excerpt"
                        label="Ringkasan"
                        containerClassName="md:col-span-2"
                        className="min-h-28"
                        placeholder="Ringkasan singkat pengumuman..."
                        error={errors.excerpt?.message}
                        {...form.register("excerpt")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Media" description="Gambar cover pengumuman." icon={ImageIcon}>
                <FormGrid>
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">Cover Pengumuman</label>

                        <ImageUpload
                            value={form.watch("coverImage")}
                            onChange={(url) =>
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
                title="Isi Pengumuman"
                description="Konten lengkap yang akan ditampilkan kepada masyarakat."
                icon={FileText}
            >
                <FormGrid>
                    <FormTextarea
                        id="content"
                        label="Isi"
                        containerClassName="md:col-span-2"
                        className="min-h-72"
                        placeholder="Tulis isi pengumuman..."
                        error={errors.content?.message}
                        {...form.register("content")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Publikasi"
                description="Pengaturan visibilitas pengumuman."
                icon={Eye}
            >
                <FormGrid>
                    <FormSwitch
                        id="published"
                        label="Publikasikan"
                        description="Pengumuman akan langsung tampil di website publik."
                        checked={form.watch("published")}
                        onCheckedChange={(checked) => form.setValue("published", checked)}
                    />
                </FormGrid>
            </FormSection>

            <FormActions
                isPending={form.formState.isSubmitting}
                onCancel={onSuccess}
                submitText={mode === "edit" ? "Simpan Perubahan" : "Simpan Pengumuman"}
                pendingText="Menyimpan..."
            />
        </form>
    );
}
