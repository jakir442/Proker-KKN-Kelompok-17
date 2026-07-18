import { ReactNode } from "react";

import { Navbar } from "@/components/public/navbar/Navbar";
import { Footer } from "@/components/public/footer/Footer";
import { BackToTop } from "@/components/public/common/BackToTop";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>
            <Navbar />

            <main className="min-h-screen">{children}</main>

            <BackToTop />
            <Footer />
        </>
    );
}
