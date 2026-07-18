import { Building2, Sparkles } from "lucide-react";

export function LoginBrand() {
    return (
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="animate-slide-down flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/20 bg-background/70 shadow-large backdrop-blur-xl transition-transform duration-500 hover:scale-105">
                <Building2 className="h-12 w-12 text-primary" />
            </div>

            <div className="animate-enter-delay mt-8 badge-premium gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <Sparkles className="h-3.5 w-3.5" />
                Sistem Smart Village Aktif
            </div>

            <h1 className="animate-enter-delay mt-8 heading-hero">
                Cintanagara
                <span className="block text-gradient">Smart Village</span>
            </h1>

            <p className="animate-enter-delay mt-6 max-w-2xl body-lg text-balance">
                Platform digital Pemerintah Desa Cintanagara yang menghadirkan pelayanan publik,
                transparansi pemerintahan, informasi desa, dan administrasi dalam satu sistem yang
                modern, cepat, dan mudah digunakan.
            </p>
        </div>
    );
}
