import { Menu } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { UserDropdown } from "./UserDropdown";

export function Header() {
    return (
        <header className="sticky top-0 z-30 border-b bg-white">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button className="rounded-md p-2 hover:bg-slate-100 lg:hidden">
                        {/* Menu Hamburger */}
                        <Menu className="h-5 w-5" />
                    </button>
                    <Breadcrumb />
                </div>
                <UserDropdown />
            </div>
        </header>
    );
}
