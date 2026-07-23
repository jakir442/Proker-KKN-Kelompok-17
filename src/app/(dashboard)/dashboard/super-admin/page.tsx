import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { WelcomeBanner } from "@/components/dashboard/super-admin/sections/WelcomeBanner";
import { DashboardStats } from "@/components/dashboard/super-admin/sections/DashboardStats";
import { DashboardQuickActions } from "@/components/dashboard/super-admin/sections/DashboardQuickActions";
import { RecentActivity } from "@/components/dashboard/super-admin/sections/RecentActivity";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-8">
            <WelcomeBanner name={session.user.name ?? ""} role={session.user.role ?? ""} />
            <DashboardStats />
            <DashboardQuickActions role={session.user.role ?? ""} />
            <RecentActivity />
        </div>
    );
}
