import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />

                <div className="text-center">
                    <h3 className="text-lg font-semibold">Memuat Data UMKM</h3>

                    <p className="text-sm text-muted-foreground">Mohon tunggu sebentar...</p>
                </div>
            </div>
        </div>
    );
}
