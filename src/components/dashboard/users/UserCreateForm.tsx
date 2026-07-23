"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createUserAction } from "@/actions/user/create-user";
import { ROLES } from "@/constants/roles";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createUserSchema, CreateUserInput } from "@/validations/user.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
            <div className="grid gap-4 md:grid-cols-2">
                {/* Nama */}
                <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>

                    <Input
                        id="fullName"
                        placeholder="Masukkan nama lengkap"
                        {...form.register("fullName")}
                    />

                    {form.formState.errors.fullName && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>

                    <Input
                        id="username"
                        placeholder="Masukkan username"
                        {...form.register("username")}
                    />

                    {form.formState.errors.username && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.username.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email"
                        {...form.register("email")}
                    />

                    {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        placeholder="Masukkan password"
                        {...form.register("password")}
                    />

                    {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                    <Label>Role</Label>

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
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label>Status</Label>

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
                </div>

                {/* Nomor HP */}
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Nomor HP</Label>

                    <Input
                        id="phoneNumber"
                        placeholder="Masukkan nomor HP"
                        {...form.register("phoneNumber")}
                    />

                    {form.formState.errors.phoneNumber && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.phoneNumber.message}
                        </p>
                    )}
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>

                    <Input
                        id="address"
                        placeholder="Masukkan alamat"
                        {...form.register("address")}
                    />

                    {form.formState.errors.address && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.address.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                    Batal
                </Button>

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Menyimpan..." : "Simpan User"}
                </Button>
            </div>
        </form>
    );
}
