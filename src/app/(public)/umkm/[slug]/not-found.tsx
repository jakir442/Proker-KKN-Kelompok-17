import Link from "next/link";
import { Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/public/layout/Container";

export default function NotFound() {
    return (
        <Container className="flex min-h-[70vh] items-center justify-center py-20">
            <div className="max-w-lg text-center">
                <Store className="mx-auto h-16 w-16 text-slate-300" />

                <h1 className="mt-6 text-4xl font-bold">UMKM Tidak Ditemukan</h1>

                <p className="mt-4 text-slate-600">
                    Data UMKM yang Anda cari tidak tersedia atau telah dihapus.
                </p>

                <Button className="mt-8 rounded-xl">
                    <Link href="/umkm">Kembali ke Daftar UMKM</Link>
                </Button>
            </div>
        </Container>
    );
}
