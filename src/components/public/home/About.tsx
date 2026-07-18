import Image from "next/image";
import Link from "next/link";

import { getVillageProfilePublicAction } from "@/actions/public/get-village-profile";

import { Button } from "@/components/ui/button";

import { Container } from "../layout/Container";

export async function About() {
    const result = await getVillageProfilePublicAction();

    const profile = result.success ? result.data : null;

    const about =
        profile?.about ??
        "Desa Cintanagara merupakan salah satu desa di Kecamatan Cigedug, Kabupaten Garut yang memiliki potensi pada sektor pertanian, UMKM, pariwisata, serta pemberdayaan masyarakat.";

    const summary = about.length > 260 ? `${about.substring(0, 260)}...` : about;

    return (
        <section className="py-24">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-muted">
                        <Image
                            src={profile?.headmanPhoto || "/images/about-desa.jpg"}
                            alt="Desa Cintanagara"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <span className="font-semibold text-primary">Tentang Desa</span>

                        <h2 className="mt-3 text-4xl font-bold tracking-tight">
                            Mengenal Desa Cintanagara
                        </h2>

                        <p className="mt-6 leading-8 text-muted-foreground">{summary}</p>

                        <p className="mt-5 leading-8 text-muted-foreground">
                            Website Smart Village hadir sebagai pusat informasi resmi desa yang
                            menyediakan layanan digital, transparansi pemerintahan, informasi UMKM,
                            wisata, kegiatan desa, serta berbagai informasi publik yang dapat
                            diakses kapan saja.
                        </p>

                        <Button className="mt-8">
                            <Link href="/profil">Selengkapnya</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
