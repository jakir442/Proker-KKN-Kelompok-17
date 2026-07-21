import { CalendarX2 } from "lucide-react";

export function EventEmpty() {
    return (
        <div className="rounded-3xl border border-dashed bg-background py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CalendarX2 className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mt-8 text-2xl font-bold">Agenda Tidak Ditemukan</h3>

            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Tidak ada agenda yang sesuai dengan pencarian atau filter yang dipilih.
            </p>
        </div>
    );
}
