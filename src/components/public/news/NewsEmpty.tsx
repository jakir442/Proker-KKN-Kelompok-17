import { Newspaper } from "lucide-react";

export function NewsEmpty() {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/30 px-8 text-center">
            <div className="rounded-2xl bg-primary/10 p-4">
                <Newspaper className="h-8 w-8 text-primary" />
            </div>

            <h3 className="mt-6 text-xl font-bold">Berita tidak ditemukan</h3>

            <p className="mt-2 max-w-md text-muted-foreground">
                Coba gunakan kata kunci lain atau hapus pencarian untuk melihat semua berita yang
                tersedia.
            </p>
        </div>
    );
}
