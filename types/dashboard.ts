import type { LucideIcon } from "lucide-react"

export type DashboardRole = "customer" | "owner" | "admin"

export type DashboardMenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}
