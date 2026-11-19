import Link from "next/link"
import { HardHat } from "lucide-react"

const marketplaceLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Equipment", href: "/equipment" },
  { label: "User Dashboard", href: "/dashboard" },
]

const categoryLinks = [
  { label: "Construction Equipment", href: "/equipment?category=construction" },
  { label: "Photography Equipment", href: "/equipment?category=photography" },
  {
    label: "Vehicles & Transportation",
    href: "/equipment?category=vehicles-transportation",
  },
  { label: "Agriculture Equipment", href: "/equipment?category=agriculture" },
]

export function Footer() {
  return (
    <footer className="bg-background mt-10 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="RENTIFY home"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-teal-600 text-white ring-1 ring-teal-700/20">
                <HardHat className="size-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-black tracking-tight">
                RENT<span className="text-teal-600">IFY</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              Equipment rental marketplace connecting verified equipment owners
              with renters for construction, media, transport, agriculture, and
              events.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-foreground uppercase">
              Marketplace
            </p>
            <ul className="mt-3 space-y-1.5">
              {marketplaceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-teal-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-foreground uppercase">
              Popular Categories
            </p>
            <ul className="mt-3 space-y-1.5">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-teal-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-foreground uppercase">
              Security &amp; Connect
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              JWT Role-Based Access &bull; Stripe Payments &bull; Verified Fleet
              Owners
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://x.com/rentify"
                target="_blank"
                rel="noreferrer"
                aria-label="RENTIFY on X"
                className="inline-flex size-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/70"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:support@rentify.io"
                className="text-sm text-muted-foreground transition-colors hover:text-teal-600"
              >
                support@rentify.io
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 RENTIFY Equipment Rental Platform. All rights reserved.</p>
          <p>Built with React, Role-Based Access Control &amp; Stripe Checkout</p>
        </div>
      </div>
    </footer>
  )
}
