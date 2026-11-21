import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main className="min-w-0 flex-1">
                <SidebarTrigger className="ml-4" />
                {children}
               
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;