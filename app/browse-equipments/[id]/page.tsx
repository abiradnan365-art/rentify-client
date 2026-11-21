import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CircleCheck,
  FileText,
  Heart,
  ImageOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getEquipmentById } from "@/lib/api/jobs"
import { cn } from "@/lib/utils"
import BookNow from "@/app/components/BookNow"


type EquipmentDetailsPageProps = {
  params: Promise<{ id: string }>
}

function DetailStat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-bold">{value || "Not specified"}</dd>
    </div>
  )
}

const EquipmentDetailsPage =async ({ params }: EquipmentDetailsPageProps) => {

  const { id } = await params
  const equipment = await getEquipmentById(id)

  if (!equipment) {
    notFound()
  }

  const image = equipment.images?.[0]
  const inStock = equipment.quantity > 0


  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/browse-equipments"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-teal-700"
      >
        <ArrowLeft className="size-4" />
        Back to Equipment Catalog
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
            {image ? (
              <Image
                src={image}
                alt={equipment.name}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                <ImageOff className="size-10" />
              </div>
            )}
          </div>

          {equipment.rentalTerms ? (
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <FileText className="size-4 text-teal-600" />
                Rental Terms &amp; Conditions
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {equipment.rentalTerms}
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="max-w-[60%] truncate rounded-full border border-teal-200 px-3 py-1 text-xs font-medium text-teal-800">
              {equipment.category}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium",
                inStock
                  ? "border-teal-200 text-teal-800"
                  : "border-rose-200 text-rose-700"
              )}
            >
              {inStock
                ? `${equipment.quantity} Units Available`
                : "Currently Rented Out"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-[28px] sm:leading-tight">
            {equipment.name}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {equipment.description || "No description provided."}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3">
            <p className="whitespace-nowrap">
              <span className="text-2xl font-bold">
                ${equipment.rentalPrice}
              </span>{" "}
              <span className="text-xs text-muted-foreground">
                / {equipment.rentalType}
              </span>
            </p>
            <span className="text-right text-xs font-semibold text-teal-700">
              Stripe Escrow Protected
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3">
            <DetailStat label="Location Hub" value={equipment.location} />
            <DetailStat label="Condition" value={equipment.condition} />
            <DetailStat label="Brand" value={equipment.brand} />
            <DetailStat label="Model" value={equipment.model} />
          </dl>

          {equipment.owner ? (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50/60 p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.12em] text-teal-800 uppercase">
                  Verified Equipment Owner
                </p>
                <p className="mt-1 truncate text-sm font-bold">
                  {equipment.owner.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {equipment.owner.email}
                </p>
              </div>
              <CircleCheck className="size-5 shrink-0 text-teal-600" />
            </div>
          ) : null}

          <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
           <BookNow equipment={equipment} session={null} />
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-lg px-5"
            >
              <Heart className="size-4" />
              Favorite
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetailsPage
