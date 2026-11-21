import { EquipmentActions } from "@/components/equipment/equipment-actions"
import { EquipmentStatusBadge } from "@/components/equipment/equipment-status-badge"
import type { Equipment } from "@/types/equipment"

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold">{equipment.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {equipment.category}
          </p>
        </div>
        <EquipmentStatusBadge status={equipment.status} />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-bold text-teal-700">
          ${equipment.rentalPrice}/{equipment.rentalType}
        </span>
        <span className="text-muted-foreground">
          Qty: {equipment.quantity}
        </span>
      </div>

      <div className="mt-3 flex justify-end">
        <EquipmentActions equipment={equipment} layout="inline" />
      </div>
    </div>
  )
}
