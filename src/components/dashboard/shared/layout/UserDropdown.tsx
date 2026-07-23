"use client";

import { LogOut, Settings, User } from "lucide-react";

import { logoutAction } from "@/actions/auth/logout";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { ROLES } from "@/constants/roles";

interface UserDropdownProps {
    name?: string;
    role?: string;
}

export function UserDropdown({ name, role }: UserDropdownProps) {
    const initials =
        name
            ?.split(" ")
            .map((item) => item[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "US";

    const roleLabel =
        role === ROLES.SUPER_ADMIN
            ? "Super Admin"
            : role === ROLES.ADMIN
              ? "Admin Desa"
              : role === ROLES.PETUGAS
                ? "Petugas Desa"
                : role === ROLES.UMKM
                  ? "Pelaku UMKM"
                  : "User";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
                    "hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
            >
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="hidden text-left md:block">
                    <p className="max-w-32 truncate text-sm font-semibold">{name ?? "User"}</p>

                    <p className="text-xs text-muted-foreground">{roleLabel}</p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-lg">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                        <User className="h-4 w-4" />
                        Profil
                    </DropdownMenuItem>

                    <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Pengaturan
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <form action={logoutAction}>
                    <DropdownMenuItem>
                        <button
                            type="submit"
                            className="flex w-full items-center gap-2 text-destructive"
                        >
                            <LogOut className="h-4 w-4" />
                            Keluar
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
