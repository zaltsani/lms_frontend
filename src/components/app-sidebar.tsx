"use client"

import { RxDashboard } from "react-icons/rx";
import { IoMdBook } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { SiTestcafe } from "react-icons/si";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useAuthContext } from "@/utils/AuthContext"
import { NavUser } from "./nav-user"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: RxDashboard,
  },
  {
    title: "Course",
    url: "/course",
    icon: IoMdBook
  },
  {
    title: "Schedule",
    url: "/Schedule",
    icon: IoCalendarNumberOutline
  },
  {
    title: "Examination",
    url: "/examination",
    icon: SiTestcafe
  },
  {
    title: "Chat",
    url: "/chat",
    icon: IoChatboxEllipsesOutline
  }
]


export function AppSidebar({ rootURL }) {
  const { user } = useAuthContext()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LuGalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Learning Management System</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`${rootURL}${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}