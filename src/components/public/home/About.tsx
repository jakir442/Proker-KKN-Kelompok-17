import Image from "next/image";

import { Container } from "../layout/Container";

export function About() {
    return (
        <section className="py-24">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative h-[450px] overflow-hidden rounded-3xl">
                        <Image
                            src="/images/about-desa.jpg"
                            alt="Tentang Desa"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <span className="font-semibold text-emerald-600">Tentang Desa</span>

                        <h2 className="mt-3 text-4xl font-bold">Mengenal Desa Cintanagara</h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            Desa Cintanagara merupakan salah satu desa di Kecamatan Cigedug,
                            Kabupaten Garut yang memiliki potensi besar pada sektor pertanian, UMKM,
                            pariwisata, dan pemberdayaan masyarakat.
                        </p>

                        <p className="mt-5 leading-8 text-slate-600">
                            Melalui Website Digital Desa, masyarakat dapat memperoleh informasi
                            secara cepat, transparan, dan mudah diakses kapan saja.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
