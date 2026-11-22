import Link from "next/link"
import { Plus } from "lucide-react"

import { EquipmentActions } from "@/components/equipment/equipment-actions"
import { EquipmentCard } from "@/components/equipment/equipment-card"
import { EquipmentStatusBadge } from "@/components/equipment/equipment-status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getEquipmentsByOwner } from "@/lib/api/jobs"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/types/equipment"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const tableHeadClass =
  "h-11 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase"

const ManageEquipmentsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) redirect("/login")

  const equipment: Equipment[] = await getEquipmentsByOwner(user.id)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-5xl gap-0 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">
              My Listed Equipment
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage pricing, availability, and approval status of your fleet.
            </p>
          </div>

          <Button
            render={<Link href="/dashboard/owner/equipments/new" />}
            nativeButton={false}
            className="h-10 rounded-full bg-teal-600 px-5 text-sm font-semibold text-white hover:bg-teal-700"
          >
            <Plus className="size-4" />
            Add New
          </Button>
        </div>

        <div className="mt-6 hidden lg:block">
          <Table className="min-w-[620px]">
            <TableHeader className="bg-muted/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className={cn(tableHeadClass, "pl-3")}>
                  Equipment
                </TableHead>
                <TableHead className={tableHeadClass}>Category</TableHead>
                <TableHead className={tableHeadClass}>Price</TableHead>
                <TableHead className={tableHeadClass}>Qty</TableHead>
                <TableHead className={tableHeadClass}>Status</TableHead>
                <TableHead
                  className={cn(tableHeadClass, "pr-3 text-right")}
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {equipment.map((item) => (
                <TableRow key={item._id} className="hover:bg-transparent">
                  <TableCell className="max-w-[220px] py-5 pl-3 font-bold whitespace-normal">
                    {item.name}
                  </TableCell>

                  <TableCell className="py-5 text-muted-foreground">
                    <span className="block max-w-[170px] whitespace-normal">
                      {item.category}
                    </span>
                  </TableCell>

                  <TableCell className="py-5 font-bold whitespace-nowrap text-teal-700">
                    ${item.rentalPrice}/{item.rentalType}
                  </TableCell>

                  <TableCell className="py-5">{item.quantity}</TableCell>

                  <TableCell className="py-5">
                    <EquipmentStatusBadge status={item.status} />
                  </TableCell>

                  <TableCell className="py-4 pr-3">
                    <div className="flex justify-end">
                      <EquipmentActions equipment={item} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-3 lg:hidden">
          {equipment.map((item) => (
            <EquipmentCard key={item._id} equipment={item} />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ManageEquipmentsPage
