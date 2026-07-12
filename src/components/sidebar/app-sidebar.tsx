import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";

import { SidebarLogo } from "./sidebar-logo";
import { NavMain } from "./nav-main";
import { sidebarGroups } from "./data";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b px-4 py-4">
                <SidebarLogo />
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <NavMain groups={sidebarGroups} />
            </SidebarContent>

            <SidebarFooter className="border-t px-4 py-4">
                <div className="text-center text-xs text-muted-foreground">
                    Smart Village
                    <br />
                    Desa Cintanagara
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
