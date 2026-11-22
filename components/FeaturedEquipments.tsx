import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { EquipmentBrowseCard } from "@/components/equipment/equipment-browse-card"
import type { Equipment } from "@/types/equipment"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
const FEATURED_LIMIT = 6

async function getFeaturedEquipments(): Promise<Equipment[]> {
  try {
    const res = await fetch(`${BASE_URL}/equipments`, { cache: "no-store" })

    if (!res.ok) {
      return []
    }

    const equipments: Equipment[] = await res.json()

    return equipments
      .filter((equipment) => equipment.status === "Approved")
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0

        return bTime - aTime
      })
      .slice(0, FEATURED_LIMIT)
  } catch {
    return []
  }
}

export async function FeaturedEquipments() {
  const equipments = await getFeaturedEquipments()

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-teal-600 uppercase">
              Curated Inventory
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Featured Equipment
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Hand-picked gear from verified owners, inspected and ready for
              your next project.
            </p>
          </div>

          <Link
            href="/browse-equipments"
            className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-teal-700 transition-colors hover:text-teal-800"
          >
            View All Equipment
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {equipments.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipments.map((equipment) => (
              <EquipmentBrowseCard
                key={equipment._id}
                equipment={equipment}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Featured equipment is being curated. Please check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
