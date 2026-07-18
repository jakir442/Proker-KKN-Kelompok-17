import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCard() {
    return (
        <Card>
            <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-12" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-40" />
            </CardContent>
        </Card>
    );
}
