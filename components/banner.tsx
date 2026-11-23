import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

import bannerImage from "@/app/images/luke-besley-k5l-zbRSPds-unsplash.jpg"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { value: "340+", label: "Verified Units", accent: false },
  { value: "99.4%", label: "On-Time Delivery", accent: true },
  { value: "$1.2M+", label: "Insured Fleet Value", accent: true },
]

export function Banner() {
  return (
    <section className="min-h-[calc(100svh-5rem)] bg-muted/30">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-teal-700 uppercase">
            <ShieldCheck className="size-4 shrink-0" strokeWidth={2.5} />
            RENTIFY &bull; Trusted Industrial &amp; Production Rental Marketplace
          </span>

          <h1 className="mt-7 text-4xl leading-[0.95] font-black tracking-[-0.035em] sm:text-5xl xl:text-[4rem]">
            Rent Heavy Iron &amp;{" "}
            <span className="text-teal-600">
              Pro Cinema Gear
            </span>{" "}
            On Demand.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Skip massive capital expenditure. Connect directly with verified
            equipment owners on RENTIFY, book flexible daily or monthly terms,
            and pay securely through Stripe escrow.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/browse-equipments"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white hover:bg-teal-700"
              )}
            >
              Explore Equipment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-lg border-border bg-background px-6 text-sm font-semibold hover:bg-muted"
              )}
            >
              List Your Equipment
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className={cn(
                    "text-2xl font-extrabold tracking-tight sm:text-3xl",
                    stat.accent && "text-teal-600"
                  )}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-black/10 ring-1 ring-black/5">
          <Image
            src={bannerImage}
            alt="Excavator on a construction site beneath a cloudy sky"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
