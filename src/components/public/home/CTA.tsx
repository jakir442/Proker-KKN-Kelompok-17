import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";

export function CTA() {
    return (
        <section className="bg-emerald-700 py-24 text-white">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-bold">Bersama Membangun Desa Digital</h2>

                    <p className="mt-6 leading-8 text-emerald-100">
                        Website ini menjadi sarana informasi, transparansi, serta pelayanan digital
                        bagi seluruh masyarakat Desa Cintanagara.
                    </p>

                    <Button
                        size="lg"
                        className="mt-10 bg-white text-emerald-700 hover:bg-slate-100"
                    >
                        <Link href="/kontak">Hubungi Kami</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
