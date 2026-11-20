"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  ChartColumn,
  CirclePlus,
  Heart,
  Package,
  User,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

type DashboardRole = "customer" | "owner" | "admin"

type DashboardMenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
    customer: [
      {
        id: "customer-dashboard",
        name: "My Dashboard",
        url: "/dashboard/customer",
        icon: ChartColumn,
      },
      {
        id: "customer-rentals",
        name: "My Rentals",
        url: "/dashboard/customer/rentals",
        icon: CalendarDays,
      },
    {
      id: "customer-favorites",
      name: "Favorites",
      url: "/dashboard/customer/favorites",
      icon: Heart,
    },
    {
      id: "customer-profile",
      name: "My Profile",
      url: "/dashboard/customer/profile",
      icon: User,
    },
  ],
  owner: [
    {
      id: "owner-dashboard",
      name: "My Dashboard",
      url: "/dashboard/owner",
      icon: ChartColumn,
    },
    {
      id: "owner-add-equipment",
      name: "Add Equipment",
      url: "/dashboard/owner/equipments/new",
      icon: CirclePlus,
    },
    {
      id: "owner-equipment",
      name: "My Equipment",
      url: "/dashboard/owner/equipments",
      icon: Package,
    },
    {
      id: "owner-rentals",
      name: "My Equipment Rental",
      url: "/dashboard/owner/rentals",
      icon: CalendarDays,
    },
    {
      id: "owner-profile",
      name: "My Profile",
      url: "/dashboard/owner/profile",
      icon: User,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "My Dashboard",
      url: "/dashboard/admin",
      icon: ChartColumn,
    },
    {
      id: "admin-users",
      name: "All Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-equipment",
      name: "All Equipment",
      url: "/dashboard/admin/equipment",
      icon: Package,
    },
    {
      id: "admin-rentals",
      name: "All Rentals",
      url: "/dashboard/admin/rentals",
      icon: CalendarDays,
    },
    {
      id: "admin-profile",
      name: "My Profile",
      url: "/dashboard/admin/profile",
      icon: User,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const role: DashboardRole =
    session?.user?.role === "owner" || session?.user?.role === "admin"
      ? session.user.role
      : "customer"

  return (
    <Sidebar className="top-20! h-[calc(100svh-5rem)]!">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  render={<Link href={item.url} />}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
