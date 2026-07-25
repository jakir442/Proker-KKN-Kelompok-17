"use client";

import {
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    UserRound,
    ShieldCheck,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";

import type { UserListItem } from "@/types/user-list";

interface UserDetailDrawerProps {
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailDrawer({
    user,
    open,
    onOpenChange,
}: UserDetailDrawerProps) {
    if (!user) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full overflow-y-auto px-6 sm:max-w-xl">
                <SheetHeader className="border-b px-1 pb-6">
                    <SheetTitle className="text-xl">
                        Detail Pengguna
                    </SheetTitle>

                    <SheetDescription>
                        Informasi lengkap akun pengguna Smart Village.
                    </SheetDescription>
                </SheetHeader>


                <div className="space-y-6 px-1 pt-6">

                    {/* Profile Card */}
                    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-5">

                        <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative flex items-center gap-4">

                            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg">
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>


                            <div className="min-w-0 space-y-1">

                                <h3 className="truncate text-lg font-semibold">
                                    {user.fullName}
                                </h3>


                                <p className="truncate text-sm text-muted-foreground">
                                    @{user.username}
                                </p>


                                <div className="pt-2">
                                    <StatusBadge
                                        isActive={user.isActive}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>



                    {/* Access */}
                    <div className="space-y-3">

                        <h4 className="flex items-center gap-2 text-sm font-semibold">
                            <ShieldCheck className="size-4 text-primary" />
                            Hak Akses
                        </h4>


                        <div className="rounded-xl border bg-card p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-muted-foreground">
                                    Role Pengguna
                                </span>


                                <RoleBadge role={user.role} />

                            </div>

                        </div>

                    </div>




                    {/* Contact */}
                    <div className="space-y-3">

                        <h4 className="flex items-center gap-2 text-sm font-semibold">
                            <UserRound className="size-4 text-primary" />
                            Informasi Kontak
                        </h4>


                        <div className="divide-y rounded-xl border bg-card">

                            <InfoItem
                                icon={Mail}
                                label="Email"
                                value={user.email}
                            />


                            <InfoItem
                                icon={Phone}
                                label="Nomor HP"
                                value={user.phoneNumber || "-"}
                            />


                            <InfoItem
                                icon={MapPin}
                                label="Alamat"
                                value={user.address || "-"}
                            />

                        </div>

                    </div>




                    {/* Metadata */}
                    <div className="space-y-3">

                        <h4 className="flex items-center gap-2 text-sm font-semibold">
                            <CalendarDays className="size-4 text-primary" />
                            Informasi Sistem
                        </h4>


                        <div className="rounded-xl border bg-muted/30 p-4">

                            <p className="text-xs text-muted-foreground">
                                Akun dibuat pada
                            </p>


                            <p className="mt-1 text-sm font-medium">
                                {new Date(user.createdAt).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>

                        </div>

                    </div>

                </div>

            </SheetContent>
        </Sheet>
    );
}



interface InfoItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

function InfoItem({
    icon: Icon,
    label,
    value,
}: InfoItemProps) {
    return (
        <div className="flex gap-3 p-4">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
            </div>


            <div className="min-w-0">

                <p className="text-xs text-muted-foreground">
                    {label}
                </p>


                <p className="mt-1 break-words text-sm font-medium">
                    {value}
                </p>

            </div>

        </div>
    );
}