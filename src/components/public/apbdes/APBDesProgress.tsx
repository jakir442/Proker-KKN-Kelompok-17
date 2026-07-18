interface Props {
    budget: number;
    realization: number;
}

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export function APBDesProgress({ budget, realization }: Props) {
    const percentage = budget === 0 ? 0 : Math.min(Math.round((realization / budget) * 100), 100);

    return (
        <div className="rounded-xl border p-6">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Realisasi Anggaran</h3>

                <span className="font-bold">{percentage}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
                {currency.format(realization)}
                {" / "}
                {currency.format(budget)}
            </p>
        </div>
    );
}
