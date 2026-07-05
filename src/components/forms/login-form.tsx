"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginAction } from "@/actions/auth/login";
import { loginSchema, type LoginSchema } from "@/validations/login.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
    const [isPending, startTransition] = useTransition();

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

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
        });
    };

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Smart Village</CardTitle>

                <CardDescription>Sistem Informasi Desa Cintanagara</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>

                        <Input
                            id="username"
                            placeholder="Masukkan username"
                            autoComplete="username"
                            {...register("username")}
                        />

                        {errors.username && (
                            <p className="text-sm text-destructive">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Sedang masuk..." : "Masuk"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
