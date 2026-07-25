"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AtSign, Mail, MapPinned, ShieldCheck, User, UserPlus, UserCog } from "lucide-react";

import { createUserAction } from "@/actions/user/create-user";
import { updateUserAction } from "@/actions/user/update-user";

import { ROLES } from "@/constants/roles";
import type { UserListItem } from "@/types/user-list";

import { createUserSchema, type CreateUserInput } from "@/validations/user.schema";

import { updateUserSchema, type UpdateUserInput } from "@/validations/update-user.schema";

import {
    FormActions,
    FormGrid,
    FormHeader,
    FormInput,
    FormPassword,
    FormPhone,
    FormSection,
    FormSelect,
    FormSwitch,
    FormTextarea,
} from "@/components/forms";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { focusFirstError } from "@/lib/forms/focus-first-error";

interface UserFormProps {
    mode: "create" | "edit";
    user?: UserListItem;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserForm({ mode, user, onSuccess, onCancel }: UserFormProps) {
    const [isPending, startTransition] = useTransition();

    const isCreate = mode === "create";

    const form = useForm<CreateUserInput | UpdateUserInput>({
        resolver: zodResolver(isCreate ? createUserSchema : updateUserSchema),

        defaultValues: {
            id: "",
            fullName: "",
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            address: "",
            role: ROLES.PETUGAS,
            isActive: true,
        },
    });

    const {
        formState: { errors, submitCount },
    } = form;

    useEffect(() => {
        if (!isCreate && user) {
            form.reset({
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                password: "",
                phoneNumber: user.phoneNumber,
                address: user.address,
                role: user.role as (typeof ROLES)[keyof typeof ROLES],
                isActive: user.isActive,
            });
        }
    }, [form, isCreate, user]);

    useEffect(() => {
        if (submitCount > 0) {
            focusFirstError(errors);
        }
    }, [errors, submitCount]);

    function onSubmit(values: CreateUserInput | UpdateUserInput) {
        startTransition(async () => {
            const result = isCreate
                ? await createUserAction(values as CreateUserInput)
                : await updateUserAction(values as UpdateUserInput);

            if (result.success) {
                toast.success(result.message);

                if (isCreate) {
                    form.reset();
                }

                onSuccess?.();
                return;
            }

            toast.error(result.message);
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader
                icon={isCreate ? UserPlus : UserCog}
                title={isCreate ? "Tambah Pengguna" : "Edit Pengguna"}
                description={
                    isCreate
                        ? "Lengkapi informasi akun pengguna yang akan digunakan untuk mengakses sistem Smart Village."
                        : "Perbarui informasi akun pengguna yang telah terdaftar."
                }
            />

            <FormSection
                title="Informasi Akun"
                description="Data akun yang digunakan pengguna untuk masuk ke sistem."
                icon={User}
            >
                <FormGrid>
                    <FormInput
                        id="fullName"
                        label="Nama Lengkap"
                        required
                        icon={User}
                        placeholder="Masukkan nama lengkap"
                        error={errors.fullName?.message}
                        {...form.register("fullName")}
                    />

                    <FormInput
                        id="username"
                        label="Username"
                        required
                        icon={AtSign}
                        placeholder="Masukkan username"
                        error={errors.username?.message}
                        {...form.register("username")}
                    />

                    <FormInput
                        id="email"
                        type="email"
                        label="Email"
                        required
                        icon={Mail}
                        placeholder="Masukkan email"
                        error={errors.email?.message}
                        {...form.register("email")}
                    />

                    {isCreate && (
                        <FormPassword
                            id="password"
                            label="Password"
                            required
                            placeholder="Masukkan password"
                            helperText="Minimal 8 karakter."
                            error={errors.password?.message}
                            {...form.register("password")}
                        />
                    )}
                </FormGrid>
            </FormSection>

            <FormSection
                title="Hak Akses"
                description="Tentukan hak akses dan status pengguna."
                icon={ShieldCheck}
                delay={0.05}
            >
                <FormGrid>
                    <FormSelect label="Role" required error={errors.role?.message}>
                        <Select
                            value={form.watch("role")}
                            onValueChange={(value) =>
                                form.setValue("role", value as CreateUserInput["role"])
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={ROLES.SUPER_ADMIN}>Super Admin</SelectItem>
                                <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                                <SelectItem value={ROLES.PETUGAS}>Petugas</SelectItem>
                                <SelectItem value={ROLES.UMKM}>UMKM</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormSelect>

                    {isCreate && (
                        <FormSwitch
                            id="isActive"
                            label="Status Pengguna"
                            description="Menentukan apakah pengguna dapat langsung mengakses sistem."
                            checked={form.watch("isActive")}
                            onCheckedChange={(checked) => form.setValue("isActive", checked)}
                            helperText="Nonaktifkan jika akun belum boleh login."
                        />
                    )}
                </FormGrid>
            </FormSection>

            <FormSection
                title="Informasi Tambahan"
                description="Data kontak pengguna yang dapat dihubungi."
                icon={MapPinned}
                delay={0.1}
            >
                <FormGrid>
                    <FormPhone
                        id="phoneNumber"
                        label="Nomor HP"
                        placeholder="08123456789"
                        error={errors.phoneNumber?.message}
                        {...form.register("phoneNumber")}
                    />

                    <FormTextarea
                        id="address"
                        label="Alamat"
                        containerClassName="md:col-span-2"
                        className="min-h-32"
                        placeholder="Masukkan alamat lengkap..."
                        error={errors.address?.message}
                        {...form.register("address")}
                    />
                </FormGrid>
            </FormSection>

            <FormActions
                onCancel={onCancel}
                isPending={isPending}
                submitText={isCreate ? "Simpan Pengguna" : "Simpan Perubahan"}
                pendingText="Menyimpan..."
            />
        </form>
    );
}
