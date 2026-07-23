"use client";

import Link from "next/link";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, Globe, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { WelcomeBannerProps } from "../../types";
import { CurrentTime } from "../common/CurrentTime";

export function WelcomeBanner({ name, role }: WelcomeBannerProps) {
    const now = new Date();

    const greeting =
        now.getHours() < 11
            ? "Selamat Pagi"
            : now.getHours() < 15
              ? "Selamat Siang"
              : now.getHours() < 18
                ? "Selamat Sore"
                : "Selamat Malam";

    const initials = name
        .split(" ")
        .map((item) => item[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-sky-500/[0.03]" />

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                {/* Left */}
                <div className="flex items-start gap-5">
                    <Avatar className="h-16 w-16 border shadow-sm">
                        <AvatarFallback className="bg-emerald-600 text-lg font-semibold text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-sm font-medium text-emerald-600">👋 {greeting}</p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight">{name}</h1>

                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            Selamat datang kembali di Dashboard Smart Village Cintanagara. Kelola
                            pelayanan masyarakat, administrasi desa, dan informasi publik dengan
                            lebih mudah.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Badge variant="secondary">
                                <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                                {role}
                            </Badge>

                            <Badge variant="outline">
                                <CalendarDays className="mr-1 h-3.5 w-3.5" />
                                {format(now, "EEEE, d MMMM yyyy", {
                                    locale: id,
                                })}
                            </Badge>

                            <Badge variant="outline">
                                <Clock3 className="mr-1 h-3.5 w-3.5" />
                                <CurrentTime />
                            </Badge>

                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                ● Online
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-3 xl:items-end">
                    <Button size="lg" className="rounded-xl">
                        <Link href="/">
                            <Globe className="mr-2 h-4 w-4" />
                            Lihat Website Desa
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    <p className="text-center text-xs text-muted-foreground xl:text-right">
                        Smart Village Dashboard
                        <br />
                        Pemerintah Desa Cintanagara
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
