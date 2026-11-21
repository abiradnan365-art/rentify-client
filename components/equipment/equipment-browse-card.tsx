import Image from "next/image"
import { ChevronRight, Heart, ImageOff, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/types/equipment"

export function EquipmentBrowseCard({ equipment }: { equipment: Equipment }) {
  const image = equipment.images?.[0]
  const inStock = equipment.quantity > 0

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={equipment.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        )}

        <span className="absolute top-3 left-3 max-w-[calc(100%-4.5rem)] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-sm">
          {equipment.category}
        </span>

        <button
          type="button"
          aria-label={`Save ${equipment.name} to favorites`}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm transition-colors hover:text-rose-500"
        >
          <Heart className="size-4" />
        </button>

        <span
          className={cn(
            "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            inStock
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              inStock ? "bg-emerald-500" : "bg-rose-500"
            )}
          />
          {inStock
            ? `Available (${equipment.quantity} in stock)`
            : "Currently Rented Out"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {equipment.location || "Location not set"}
            </span>
          </span>
          <span className="shrink-0 truncate">
            {equipment.brand || "Unbranded"}
          </span>
        </div>

        <h2 className="mt-2 truncate text-[15px] font-bold">
          {equipment.name}
        </h2>
        <p className="mt-1 line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {equipment.description || "No description provided."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
          <p className="whitespace-nowrap">
            <span className="text-lg font-bold">
              ${equipment.rentalPrice}
            </span>{" "}
            <span className="text-xs text-muted-foreground">
              / {equipment.rentalType}
            </span>
          </p>

          <Button
            type="button"
            className="rounded-full bg-teal-600 px-4 text-white hover:bg-teal-700"
          >
            View Details
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  )
}
