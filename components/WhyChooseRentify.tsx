import { Clock3, CreditCard, DollarSign, ShieldCheck } from "lucide-react"

const benefits = [
  {
    title: "Verified Equipment Owners",
    description:
      "Every owner undergoes identity, serial ownership, and maintenance inspection before listing.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Rental Periods",
    description:
      "Book by the day, week, or month with automatic duration pricing and instant extensions.",
    icon: Clock3,
  },
  {
    title: "Affordable Transparent Rates",
    description:
      "Direct owner pricing with zero broker markups and clear upfront terms.",
    icon: DollarSign,
  },
  {
    title: "Stripe-Secured Payments",
    description:
      "PCI-DSS compliant Stripe checkout with instant digital receipts and transaction logs.",
    icon: CreditCard,
  },
]

export function WhyChooseRentify() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-emerald-500 uppercase">
            Built for Reliability
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Why Choose RENTIFY
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Enterprise compliance meets effortless digital booking.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <article
                key={benefit.title}
                className="flex flex-col rounded-xl border border-border bg-muted/40 p-6 px-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Icon className="size-5" strokeWidth={2} />
                </span>

                <h3 className="mt-6 text-[17px] font-black tracking-tight sm:text-lg lg:text-[17px]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
