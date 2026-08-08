import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/constants/site";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3">
            <Image
                src="/logo/icon-website.png"
                alt="Logo Desa Cintanagara"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
            />

            <div className="leading-tight">
                <h1 className="font-bold text-slate-900">{SITE.name}</h1>

                <p className="text-xs text-slate-500">Smart Village</p>
            </div>
        </Link>
    );
}
