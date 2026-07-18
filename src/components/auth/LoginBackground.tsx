export function LoginBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-background" />

            {/* Grid */}
            <div
                className="
                    absolute inset-0
                    bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),
                    linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]
                    bg-[size:48px_48px]
                    mask-image:linear-gradient(to_bottom,black,transparent)
                "
            />

            {/* Primary Glow */}
            <div
                className="
                    absolute
                    -left-32
                    -top-32
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-primary/20
                    blur-[120px]
                    animate-float-slow
                "
            />

            {/* Accent Glow */}
            <div
                className="
                    absolute
                    -right-40
                    top-1/3
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-sky-500/20
                    blur-[140px]
                    animate-float
                "
            />

            {/* Bottom Glow */}
            <div
                className="
                    absolute
                    bottom-[-180px]
                    left-1/2
                    h-[400px]
                    w-[600px]
                    -translate-x-1/2
                    rounded-full
                    bg-primary/10
                    blur-[120px]
                "
            />

            {/* Noise */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.035]
                    mix-blend-overlay
                    bg-[url('/noise.png')]
                "
            />
        </div>
    );
}
