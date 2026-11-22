import { DeleteEquipmentDialog } from "@/app/components/DeleteEquipmentDialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/types/equipment"
import Link from "next/link"
import { UpdateEquipmentDialog } from "./update-equipment-dialog"

type EquipmentActionsProps = {
  equipment: Equipment
  layout?: "stacked" | "inline"
}

export function EquipmentActions({
  equipment,
  layout = "stacked",
}: EquipmentActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/browse-equipments/${equipment._id}`}
        className="flex h-9 items-center rounded-lg bg-muted px-4 text-sm font-medium hover:bg-muted/70"
      >
        View
      </Link>
       

      <div
        className={cn(
          "flex gap-1",
          layout === "stacked" ? "flex-col" : "flex-row"
        )}
      >
       <UpdateEquipmentDialog equipment={equipment} />
        <DeleteEquipmentDialog equipment={equipment} />
      </div>
    </div>
  )
}
