"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { resetUserPasswordAction } from "@/actions/user/reset-user-password";

import type { UserListItem } from "@/types/user-list";

interface ResetPasswordDialogProps {
    user?: UserListItem;

    open: boolean;

    onOpenChange: (open: boolean) => void;
}

export function ResetPasswordDialog({ user, open, onOpenChange }: ResetPasswordDialogProps) {
    const [password, setPassword] = useState("");

    const [isPending, startTransition] = useTransition();

    function handleSubmit() {
        if (!user) return;

        startTransition(async () => {
            const result = await resetUserPasswordAction({
                id: user.id,
                password,
            });

            if (result.success) {
                toast.success(result.message);
                setPassword("");
                onOpenChange(false);
                return;
            }

            toast.error(result.message);
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <KeyRound className="size-6" />
                    </div>

                    <AlertDialogTitle>Reset Password</AlertDialogTitle>

                    <AlertDialogDescription>
                        Buat password baru untuk akun <strong>{user?.fullName}</strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2">
                    <Label>Password Baru</Label>

                    <Input
                        type="password"
                        placeholder="Masukkan password baru"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>

                    <AlertDialogAction disabled={isPending || !password} onClick={handleSubmit}>
                        {isPending ? "Menyimpan..." : "Reset Password"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
