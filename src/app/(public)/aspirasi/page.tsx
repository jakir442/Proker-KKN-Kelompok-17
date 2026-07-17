import { Metadata } from "next";
import { ClipboardList, SearchCheck, BadgeCheck } from "lucide-react";

import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { ComplaintForm } from "@/components/public/complaints/ComplaintForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Aspirasi & Pengaduan",
    description:
        "Sampaikan aspirasi, masukan, maupun pengaduan kepada Pemerintah Desa Cintanagara.",
};

const steps = [
    {
        icon: ClipboardList,
        title: "1. Kirim Laporan",
        description:
            "Isi formulir aspirasi atau pengaduan dengan informasi yang lengkap agar mudah ditindaklanjuti.",
    },
    {
        icon: SearchCheck,
        title: "2. Ditinjau Pemerintah Desa",
        description:
            "Petugas desa akan memverifikasi laporan, memberikan tanggapan, dan memperbarui status penanganan.",
    },
    {
        icon: BadgeCheck,
        title: "3. Tindak Lanjut",
        description:
            "Laporan yang telah diproses akan memperoleh status penyelesaian beserta tanggapan resmi dari pemerintah desa.",
    },
];

export default function ComplaintPage() {
    return (
        <Container className="py-16">
            <SectionHeader
                badge="Pelayanan Publik"
                title="Aspirasi & Pengaduan Warga"
                description="Sampaikan aspirasi, kritik, saran, maupun pengaduan kepada Pemerintah Desa Cintanagara. Setiap laporan akan ditindaklanjuti sesuai prosedur yang berlaku."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                        <Card
                            key={step.title}
                            className="border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <CardContent className="flex flex-col items-center p-8 text-center">
                                <div className="mb-5 rounded-full bg-primary/10 p-4">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>

                                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-14">
                <ComplaintForm />
            </div>
        </Container>
    );
}
