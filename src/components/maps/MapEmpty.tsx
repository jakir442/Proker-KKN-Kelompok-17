import { MapPinOff } from "lucide-react";

interface MapEmptyProps {
    title?: string;
    description?: string;
}

export function MapEmpty({
    title = "Lokasi Belum Tersedia",
    description = "Koordinat lokasi belum ditambahkan oleh administrator. Silakan kembali lagi nanti atau hubungi pihak desa untuk informasi lebih lanjut.",
}: MapEmptyProps) {
    return (
        <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <MapPinOff className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
    );
}
