import AuthContextProvider from "@/utils/AuthContext"
import Header from "../components/Header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function layout({children}) {
    return (
        <AuthContextProvider>
          {/* <Header /> */}
          <SidebarProvider>
            <AppSidebar rootURL={"/student"} />
            <main className="w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </AuthContextProvider>
    )
}

export default layout