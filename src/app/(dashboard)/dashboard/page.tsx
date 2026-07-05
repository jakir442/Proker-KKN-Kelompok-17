import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p>
                Selamat datang, <strong>{session.user.name}</strong>
            </p>

            <p>
                Role: <strong>{session.user.role}</strong>
            </p>
        </div>
    );
}
