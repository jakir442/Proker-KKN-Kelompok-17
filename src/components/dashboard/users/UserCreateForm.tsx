"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createUserAction } from "@/actions/user/create-user";
import { ROLES } from "@/constants/roles";

import { Input } from "@/components/ui/input";

import { createUserSchema, CreateUserInput } from "@/validations/user.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AtSign, KeyRound, Mail, MapPinned, ShieldCheck, User, UserPlus } from "lucide-react";
import { FormHeader } from "@/components/forms/FormHeader";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import {
    FormField,
    FormGrid,
    FormInput,
    FormPassword,
    FormPhone,
    FormSelect,
    FormTextarea,
} from "@/components/forms";
import { focusFirstError } from "@/lib/forms/focus-first-error";
import { useEffect } from "react";

interface UserCreateFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserCreateForm({ onSuccess, onCancel }: UserCreateFormProps) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
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
        if (submitCount > 0) {
            focusFirstError(errors);
        }
    }, [errors, submitCount]);

    function onSubmit(values: CreateUserInput) {
        startTransition(async () => {
            const result = await createUserAction(values);
            if (result.success) {
                toast.success(result.message);
                form.reset();
                onSuccess?.();
                return;
            }
            toast.error(result.message);
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader
                icon={UserPlus}
                title="Tambah Pengguna"
                description="Lengkapi informasi akun pengguna yang akan digunakan untuk mengakses sistem Smart Village."
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
                        placeholder="Masukkan nama lengkap"
                        icon={User}
                        error={form.formState.errors.fullName?.message}
                        {...form.register("fullName")}
                    />

                    <FormInput
                        id="username"
                        label="Username"
                        required
                        icon={AtSign}
                        placeholder="Masukkan username"
                        autoComplete="username"
                        error={form.formState.errors.username?.message}
                        {...form.register("username")}
                    />

                    <FormInput
                        id="email"
                        type="email"
                        label="Email"
                        required
                        icon={Mail}
                        placeholder="Masukkan alamat email"
                        autoComplete="email"
                        error={form.formState.errors.email?.message}
                        {...form.register("email")}
                    />

                    <FormPassword
                        id="password"
                        label="Password"
                        required
                        placeholder="Masukkan password"
                        helperText="Minimal 8 karakter."
                        autoComplete="new-password"
                        error={form.formState.errors.password?.message}
                        {...form.register("password")}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Hak Akses"
                description="Tentukan hak akses dan status pengguna."
                icon={ShieldCheck}
                delay={0.05}
            >
                <FormGrid>
                    {/* Role */}
                    <FormSelect label="Role" required error={form.formState.errors.role?.message}>
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

                    {/* Status */}
                    <FormSelect label="Status" required>
                        <Select
                            value={String(form.watch("isActive"))}
                            onValueChange={(value) => form.setValue("isActive", value === "true")}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="true">Aktif</SelectItem>
                                <SelectItem value="false">Nonaktif</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormSelect>
                </FormGrid>
            </FormSection>

            <FormSection
                title="Informasi Tambahan"
                description="Data kontak pengguna yang dapat dihubungi."
                icon={MapPinned}
                delay={0.1}
            >
                <FormGrid>
                    {/* Nomor HP */}
                    <FormPhone
                        id="phoneNumber"
                        label="Nomor HP"
                        placeholder="Contoh: 081234567890"
                        helperText="Gunakan nomor WhatsApp yang aktif."
                        error={form.formState.errors.phoneNumber?.message}
                        {...form.register("phoneNumber")}
                    />

                    {/* Alamat */}
                    <FormTextarea
                        id="address"
                        label="Alamat"
                        placeholder="Masukkan alamat lengkap pengguna..."
                        helperText="Contoh: Kampung Cibodas RT 01 RW 05, Desa Cintanagara."
                        className="min-h-32"
                        containerClassName="md:col-span-2"
                        error={form.formState.errors.address?.message}
                        {...form.register("address")}
                    />
                </FormGrid>
            </FormSection>

            <FormActions
                onCancel={onCancel}
                isPending={isPending}
                submitText="Simpan Pengguna"
                pendingText="Menyimpan..."
            />
        </form>
    );
}
