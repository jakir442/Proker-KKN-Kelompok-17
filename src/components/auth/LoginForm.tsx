"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, LockKeyhole, User } from "lucide-react";

import { loginAction } from "@/actions/auth/login";
import { loginSchema, type LoginSchema } from "@/validations/login.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: LoginSchema) => {
        startTransition(async () => {
            const formData = new FormData();

            formData.append("username", values.username);
            formData.append("password", values.password);

            const result = await loginAction(formData);
            const message = result?.message || "Terjadi kesalahan saat masuk.";

            if (!result?.success) {
                toast.error(message);
                return;
            }

            toast.success(message);
        });
    };

    return (
        <Card className="animate-enter w-full max-w-md overflow-hidden rounded-3xl border-border/60 bg-background/80 shadow-large backdrop-blur-xl">
            <CardHeader className="space-y-4 pb-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <LockKeyhole className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-2">
                    <CardTitle className="heading-2">Selamat Datang</CardTitle>

                    <CardDescription className="body-text">
                        Masuk ke akun Smart Village untuk mengakses dashboard administrasi desa.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>

                        <div className="relative">
                            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="username"
                                autoComplete="username"
                                placeholder="Masukkan username"
                                className="input-premium pl-11"
                                {...register("username")}
                            />
                        </div>

                        {errors.username && (
                            <p className="text-sm text-destructive">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Masukkan password"
                                className="input-premium px-11"
                                {...register("password")}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={
                                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={isPending} className="btn-premium w-full">
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Sedang Masuk...
                            </>
                        ) : (
                            "Masuk ke Dashboard"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
