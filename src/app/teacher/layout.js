'use client'

import AuthContextProvider from "@/utils/AuthContext"
import Header from "../components/Header"
import ProtectedRoute from "../components/ProtectedRoute"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function layout({children}) {
    return (
        <AuthContextProvider>
            <SidebarProvider>
                <AppSidebar rootURL={"/teacher"} />
                <main className="w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </AuthContextProvider>
    )
}

export default layout