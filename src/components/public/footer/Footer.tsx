import Link from "next/link";
import { ArrowRight, Landmark, LayoutGrid, MapPin } from "lucide-react";

import { navigation } from "@/config/navigation";
import { FadeUp, Reveal } from "@/components/animations";
import { Container } from "../layout/Container";
import { Logo } from "../common/Logo";

const quickLinks = navigation.filter((item) => item.href);

const serviceLinks = navigation.find((item) => item.title === "Layanan")?.children ?? [];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <Reveal>
            <footer className="relative overflow-hidden border-t bg-gradient-to-b from-background to-muted/20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <Container className="py-16">
                    <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
                        {/* Brand */}
                        <FadeUp delay={0}>
                            <div className="space-y-5">
                                <Logo />

                                <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                                    Website resmi Pemerintah Desa Cintanagara yang menghadirkan
                                    pelayanan digital, informasi desa, transparansi, UMKM, wisata,
                                    serta berbagai layanan publik untuk masyarakat.
                                </p>
                            </div>
                        </FadeUp>

                        {/* Navigation */}
                        <FadeUp delay={0.05}>
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-foreground">
                                    Jelajahi
                                </h3>

                                <nav className="mt-5 flex flex-col gap-3">
                                    {quickLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href!}
                                            className="group flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md"
                                        >
                                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />

                                            <span>{item.title}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </FadeUp>

                        {/* Services */}
                        <FadeUp delay={0.1}>
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-foreground">
                                    Layanan Digital
                                </h3>

                                <nav className="mt-5 flex flex-col gap-3">
                                    {serviceLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href!}
                                            className="group flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md"
                                        >
                                            <LayoutGrid className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />

                                            <span>{item.title}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </FadeUp>

                        {/* Contact */}
                        <FadeUp delay={0.15}>
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-foreground">
                                    Kontak
                                </h3>

                                <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                        <div className="space-y-1">
                                            <p className="font-medium text-foreground">
                                                Desa Cintanagara
                                            </p>

                                            <p>Kecamatan Cigedug</p>

                                            <p>Kabupaten Garut</p>

                                            <p>Jawa Barat</p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border bg-background/60 p-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <Landmark className="h-4 w-4 text-primary" />
                                            Smart Village
                                        </div>

                                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                                            Platform digital desa untuk meningkatkan pelayanan
                                            publik, transparansi, dan akses informasi masyarakat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>

                    <FadeUp delay={0.2}>
                        <div className="mt-14 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                            <p>
                                © {year}{" "}
                                <span className="font-medium text-foreground">
                                    Desa Cintanagara
                                </span>
                                . Seluruh hak cipta dilindungi.
                            </p>

                            <p className="text-xs md:text-sm">
                                Dibangun sebagai platform{" "}
                                <span className="font-medium text-foreground">
                                    Cintanagara Smart Village
                                </span>{" "}
                                untuk pelayanan digital masyarakat.
                            </p>
                        </div>
                    </FadeUp>
                </Container>
            </footer>
        </Reveal>
    );
}
