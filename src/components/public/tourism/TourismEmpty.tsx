import { Compass } from "lucide-react";

export function TourismEmpty() {
    return (
        <div className="flex flex-col items-center rounded-3xl border border-dashed px-8 py-24 text-center">
            <div className="mb-6 rounded-3xl bg-primary/10 p-5 text-primary">
                <Compass className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold">Belum Ada Destinasi</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
                Saat ini belum ada destinasi wisata yang dipublikasikan.
            </p>
        </div>
    );
}
