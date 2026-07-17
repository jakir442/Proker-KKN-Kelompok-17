import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";

export function CTA() {
    return (
        <section className="bg-emerald-700 py-24 text-white">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-bold">Bersama Membangun Desa Cintanagara</h2>

                    <p className="mt-6 leading-8 text-emerald-100">
                        Mari manfaatkan layanan digital desa untuk memperoleh informasi,
                        menyampaikan aspirasi, dan berkomunikasi dengan Pemerintah Desa Cintanagara.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="bg-white text-emerald-700 hover:bg-slate-100">
                            <Link href="/aspirasi">Kirim Aspirasi</Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-emerald-700"
                        >
                            <Link href="/kontak">Hubungi Kami</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
