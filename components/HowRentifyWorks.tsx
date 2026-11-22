import { KeyRound } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Search & Filter Verified Gear",
    description:
      "Filter by category, location, availability, and daily/weekly/monthly rates to find exact specs.",
  },
  {
    number: "02",
    title: "Select Dates & Pay via Stripe",
    description:
      "Enter your rental dates, quantity, and delivery site. Complete secure checkout in seconds.",
  },
  {
    number: "03",
    title: "Deploy On Site & Track",
    description:
      "Receive dispatch confirmation, manage active rentals in your dashboard, and download invoices.",
  },
]

const partners = [
  "Apex Heavy",
  "Cinepro BD",
  "Bengal Logistics",
  "Agrotech Hub",
]

export function HowRentifyWorks() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-teal-600 uppercase">
            Simple 3-Step Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            How RENTIFY Works
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                {step.number}
              </span>
              <span
                aria-hidden="true"
                className="absolute top-6 right-6 text-5xl font-black tracking-tighter text-slate-200 select-none sm:top-7 sm:right-7"
              >
                {step.number}
              </span>

              <h3 className="mt-8 text-lg font-black tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-10 rounded-3xl bg-gradient-to-r from-[#0b3b32] via-[#0a2b2b] to-[#0b1524] p-8 shadow-xl shadow-black/5 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-12">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-teal-400 uppercase">
              Trusted Fleet Suppliers
            </p>
            <h3 className="mt-3 max-w-xl text-2xl leading-tight font-black text-white sm:text-3xl">
              Partnered With Leading Industrial &amp; Media Houses
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
              Monetize idle machinery on RENTIFY with automated booking calendars
              and guaranteed payouts.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 lg:justify-self-end">
            {partners.map((partner) => (
              <span
                key={partner}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-[11px] font-bold tracking-[0.08em] text-white uppercase"
              >
                <KeyRound className="size-4 shrink-0 text-teal-400" />
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
