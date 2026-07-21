import { ArrowRight, Store } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { UMKMCard } from "../UMKMCard";
import { IUMKM } from "@/types/umkm";

interface Props {
    items: IUMKM[];
}

export function RelatedUMKM({ items }: Props) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <SectionHeader
                    badge="Rekomendasi"
                    title="UMKM Lainnya"
                    description="Temukan UMKM unggulan lainnya yang berada di Desa Cintanagara."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <UMKMCard key={item._id} item={item} />
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <Button size="lg" variant="outline" className="rounded-xl">
                        <Link href="/umkm">
                            <Store className="mr-2 h-5 w-5" />
                            Lihat Semua UMKM
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
