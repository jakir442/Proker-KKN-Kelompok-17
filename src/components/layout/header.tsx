import { logoutAction } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="flex items-center justify-between border-b p-4">
            <h1 className="font-semibold">Smart Village</h1>

            <form action={logoutAction}>
                <Button type="submit" variant="outline">
                    Keluar
                </Button>
            </form>
        </header>
    );
}
