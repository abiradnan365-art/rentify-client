import Link from "next/link"
import { Plus } from "lucide-react"

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
import { cn } from "@/lib/utils"
import { getEquipments } from "@/lib/api/jobs"
import { DeleteEquipmentDialog } from "@/app/components/DeleteEquipmentDialog"

type EquipmentStatus = "Approved" | "Pending"

export type Equipment = {
  _id: string
  name: string
  category: string
  rentalPrice: number
  rentalType: "Hourly" | "Daily" | "Weekly" | "Monthly"
  quantity: number
  status: EquipmentStatus
}

function StatusBadge({ status }: { status: EquipmentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        status === "Approved"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-amber-200 bg-amber-50 text-amber-700"
      )}
    >
      {status}
    </span>
  )
}

function EquipmentActions({
  equipment,
  layout = "stacked",
}: {
  equipment: Equipment
  layout?: "stacked" | "inline"
}) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="secondary" size="sm" className="px-3">
        View
      </Button>

      <div
        className={cn(
          "flex gap-1",
          layout === "stacked" ? "flex-col" : "flex-row"
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-amber-300 bg-amber-50 px-3 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
        >
          Update
        </Button>
        <DeleteEquipmentDialog equipment={equipment} />
      </div>
    </div>
  )
}

const ManageEquipmentsPage = async () => {
  const equipment: Equipment[] = await getEquipments({})
  console.log("Fetched equipment:", equipment)

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
                <TableHead className="h-11 pl-3 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  Equipment
                </TableHead>
                <TableHead className="h-11 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  Category
                </TableHead>
                <TableHead className="h-11 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  Price
                </TableHead>
                <TableHead className="h-11 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  Qty
                </TableHead>
                <TableHead className="h-11 text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  Status
                </TableHead>
                <TableHead className="h-11 pr-3 text-right text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
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
                    <StatusBadge status={item.status} />
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
            <div
              key={item._id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-bold text-teal-700">
                  ${item.rentalPrice}/{item.rentalType}
                </span>
                <span className="text-muted-foreground">
                  Qty: {item.quantity}
                </span>
              </div>

              <div className="mt-3 flex justify-end">
                <EquipmentActions equipment={item} layout="inline" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ManageEquipmentsPage
