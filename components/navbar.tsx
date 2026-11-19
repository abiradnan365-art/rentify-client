"use client"

import { useState } from "react"
import Link from "next/link"
import { HardHat, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

const links = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How It Works", href: "/how-it-works" },
]

export function Navbar() {
 
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="RENTIFY home"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-teal-600 text-white ring-1 ring-teal-700/20">
            <HardHat className="size-6" strokeWidth={2.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight">RENTIFY</span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              PRO RENTAL NETWORK
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-teal-600",
                link.active && "font-semibold text-teal-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:ring-3 focus-visible:ring-teal-600/30 focus-visible:outline-none"
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  link.active && "font-semibold text-teal-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 sm:hidden">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-muted"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              Register
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
