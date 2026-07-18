import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
    name: string;
    position: string;
    photo?: string;
    phone?: string;
    email?: string;
}

export function OfficialCard({ name, position, photo, phone, email }: Props) {
    return (
        <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[4/5] w-full bg-muted">
                {photo ? (
                    <Image src={photo} alt={name} fill className="object-cover" />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        Tidak ada foto
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 p-5">
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>

                    <p className="text-sm text-primary font-medium">{position}</p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                    {phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{phone}</span>
                        </div>
                    )}

                    {email && (
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{email}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
