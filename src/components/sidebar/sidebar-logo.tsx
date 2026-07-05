import Link from "next/link";

export function SidebarLogo() {
    return (
        <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                SV
            </div>

            <div>
                <p className="font-semibold">Smart Village</p>

                <p className="text-xs text-muted-foreground">Desa Cintanagara</p>
            </div>
        </Link>
    );
}
