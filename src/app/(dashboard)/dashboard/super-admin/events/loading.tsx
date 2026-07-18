export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-72 animate-pulse rounded bg-muted" />
                </div>

                <div className="h-10 w-40 animate-pulse rounded bg-muted" />
            </div>

            <div className="rounded-xl border">
                <div className="h-[500px] animate-pulse bg-muted/40" />
            </div>
        </div>
    );
}
