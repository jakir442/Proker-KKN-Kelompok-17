import Link from "next/link";
import { Landmark } from "lucide-react";
import { SITE } from "@/constants/site";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-600 p-2 text-white">
                <Landmark className="h-5 w-5" />
            </div>

            <div className="leading-tight">
                <h1 className="font-bold text-slate-900">{SITE.name}</h1>

                <p className="text-xs text-slate-500">Smart Village</p>
            </div>
        </Link>
    );
}
