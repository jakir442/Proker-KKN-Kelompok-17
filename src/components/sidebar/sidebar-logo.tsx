import Link from "next/link";

import { SITE } from "@/constants/site";

export function SidebarLogo() {
    return (
        <Link href="/dashboard" className="flex items-center gap-3 border-b pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                SV
            </div>

            <div>
                <h2 className="font-semibold">{SITE.shortName}</h2>

                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
        </Link>
    );
}
