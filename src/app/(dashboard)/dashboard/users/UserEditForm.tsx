"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateUserAction } from "@/actions/user/update-user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateUserSchema, UpdateUserInput } from "@/validations/update-user.schema";

import type { UserListItem } from "@/types/user-list";

interface UserEditFormProps {
    user: UserListItem;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserEditForm({ user, onSuccess, onCancel }: UserEditFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<UpdateUserInput>({
        resolver: zodResolver(updateUserSchema),

        defaultValues: {
            id: "",
            fullName: "",
            username: "",
            password: "",
            email: "",
            phoneNumber: "",
            address: "",
            role: "warga",
            isActive: true,
        },
    });

    useEffect(() => {
        form.reset({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            password: "",
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.role as UpdateUserInput["role"],
            isActive: user.isActive,
        });
    }, [user, form]);

    function onSubmit(values: UpdateUserInput) {
        startTransition(async () => {
            const result = await updateUserAction(values);

            if (result.success) {
                toast.success(result.message);
                onSuccess?.();
                return;
            }

            toast.error(result.message);
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input {...form.register("fullName")} />
                {form.formState.errors.fullName && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.fullName.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Username</Label>
                <Input {...form.register("username")} />
                {form.formState.errors.username && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.username.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" {...form.register("password")} />
                {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Nomor HP</Label>
                <Input {...form.register("phoneNumber")} />
                {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.phoneNumber.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Alamat</Label>
                <Input {...form.register("address")} />
                {form.formState.errors.address && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.address.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                    Batal
                </Button>

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Memperbarui..." : "Update User"}
                </Button>
            </div>
        </form>
    );
}
