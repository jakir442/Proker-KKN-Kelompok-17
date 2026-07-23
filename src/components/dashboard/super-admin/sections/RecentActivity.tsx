import { Activity } from "lucide-react";
import { EmptyState } from "../common/EmptyState";

export function RecentActivity() {
    return (
        <section className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Aktivitas Terbaru</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Pantau aktivitas terbaru pengguna dan sistem Smart Village.
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <EmptyState
                    icon={<Activity />}
                    title="Belum ada aktivitas"
                    description="Aktivitas pengguna akan muncul di sini setelah sistem mulai digunakan."
                />
            </div>
        </section>
    );
}
