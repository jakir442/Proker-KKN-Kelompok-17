import { ShieldCheck } from "lucide-react";

export function NewsAuthorCard() {
    return (
        <section className="my-16 rounded-3xl border bg-muted/20 p-8">
            <div className="flex items-start gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="size-8 text-primary" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Portal Resmi Desa Cintanagara</h3>

                    <p className="mt-2 leading-8 text-muted-foreground">
                        Artikel ini dipublikasikan melalui
                        <strong> Cintanagara Smart Village </strong>
                        sebagai media informasi resmi Pemerintah Desa Cintanagara. Informasi yang
                        disajikan bertujuan memberikan pelayanan informasi yang akurat, transparan,
                        dan mudah diakses oleh masyarakat.
                    </p>
                </div>
            </div>
        </section>
    );
}
