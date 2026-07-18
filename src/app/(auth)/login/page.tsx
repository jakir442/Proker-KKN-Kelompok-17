import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoginBackground } from "@/components/auth/LoginBackground";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHero } from "@/components/auth/LoginHero";
import { LoginBrand } from "@/components/auth/LoginBrand";

export default function LoginPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-background">
            <LoginBackground />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
                <header>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:border-primary/40 hover:text-primary hover:shadow-medium"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        Kembali ke Beranda
                    </Link>
                </header>

                <div className="flex flex-1 items-center justify-center py-10 lg:py-14">
                    <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                        <section className="hidden lg:block">
                            <LoginHero />
                        </section>

                        <section className="flex w-full justify-center lg:justify-end lg:-translate-y-80">
                            <div className="w-full max-w-md">
                                <div className="mb-8 lg:hidden">
                                    <LoginBrand />
                                </div>
                                <LoginForm />
                            </div>
                        </section>
                    </div>
                </div>

                <footer className="py-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Pemerintah Desa Cintanagara. Semua hak dilindungi.
                </footer>
            </div>
        </main>
    );
}
