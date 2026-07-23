import Link from "next/link";
import { Mountain } from "lucide-react";
import { Container } from "@/components/public/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <Container className="flex min-h-[70vh] items-center justify-center py-20">
            <div className="max-w-xl text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <Mountain className="h-10 w-10 text-primary" />
                </div>
                <h1 className="mt-8 text-4xl font-bold">Wisata Tidak Ditemukan</h1>
                <p className="mt-4 leading-8 text-muted-foreground">
                    Destinasi wisata yang Anda cari mungkin telah dihapus atau belum dipublikasikan.
                </p>
                <Button size="lg" className="mt-10 rounded-2xl">
                    <Link href="/wisata">Kembali ke Daftar Wisata</Link>
                </Button>
            </div>
        </Container>
    );
}
