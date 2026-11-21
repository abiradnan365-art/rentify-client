import { DeleteEquipmentDialog } from "@/app/components/DeleteEquipmentDialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/types/equipment"

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
