import Link from "next/link";

import { Container } from "../layout/Container";
import { Logo } from "../common/Logo";

export function Footer() {
    return (
        <footer className="border-t bg-slate-50">
            <Container>
                <div className="grid gap-10 py-12 md:grid-cols-3">
                    <div>
                        <Logo />

                        <p className="mt-4 text-sm text-slate-600">
                            Website resmi Desa Cintanagara yang menyediakan informasi desa, berita,
                            UMKM, wisata, dan layanan masyarakat secara digital.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Menu</h3>

                        <div className="mt-4 flex flex-col gap-2 text-sm">
                            <Link href="/">Home</Link>
                            <Link href="/profil">Profil</Link>
                            <Link href="/berita">Berita</Link>
                            <Link href="/umkm">UMKM</Link>
                            <Link href="/wisata">Wisata</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold">Kontak</h3>

                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                            <p>Desa Cintanagara</p>
                            <p>Kecamatan Cigedug</p>
                            <p>Kabupaten Garut</p>
                            <p>Jawa Barat</p>
                        </div>
                    </div>
                </div>

                <div className="border-t py-6 text-center text-sm text-slate-500">
                    © 2026 Desa Cintanagara. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
