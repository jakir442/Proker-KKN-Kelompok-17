import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
    title: {
        default: "Cintanagara Smart Village",
        template: "%s | Cintanagara Smart Village",
    },
    description:
        "Platform digital Pemerintah Desa Cintanagara untuk pelayanan masyarakat, transparansi, informasi desa, dan administrasi publik.",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html
            lang="id"
            suppressHydrationWarning
            className={`${plusJakartaSans.variable} h-full scroll-smooth`}
        >
            <body className="min-h-screen bg-background font-sans text-foreground antialiased">
                {children}
            </body>
        </html>
    );
}
