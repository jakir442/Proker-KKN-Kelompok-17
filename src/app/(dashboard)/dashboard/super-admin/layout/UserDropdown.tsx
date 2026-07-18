import { logoutAction } from "@/actions/auth/logout";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { LogOut, Settings, User } from "lucide-react";

export function UserDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-accent">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>SA</AvatarFallback>
                </Avatar>

                <div className="hidden text-left md:block">
                    <p className="text-sm font-medium">Super Admin</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profil
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Pengaturan
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <form action={logoutAction}>
                    <DropdownMenuItem>
                        <button type="submit" className="flex w-full items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            Keluar
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
