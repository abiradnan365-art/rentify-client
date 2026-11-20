"use client"

import { useState } from "react"
import Link from "next/link"
import { HardHat, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { Button } from "@base-ui/react"

const links = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How It Works", href: "/how-it-works" },
]

export function Navbar() {

  const [open, setOpen] = useState(false)
  const { data: session } = authClient.useSession()
  console.log("Session data:", session)
  const handleLogout = async () => {
    await authClient.signOut()
  }

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
          {session?.user && (
            <Link
              href={`dashboard/${session.user.role}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-teal-600"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {session?.user ? (

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 py-1 pr-4 pl-1.5 shadow-2xs">
              <Avatar className="size-9 border border-teal-500/50">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt={session.user.name ?? "User"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-teal-50 text-xs font-semibold text-teal-700">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold text-slate-800 sm:text-sm">
                  {session.user.name}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  {session.user.role ?? "Customer"}
                </span>
              </div>
            </div>


            <Button
              type="button"
              onClick={handleLogout}
              className="flex h-auto items-center gap-2 rounded-full border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-2xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500/30 focus-visible:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-slate-600 transition-colors group-hover:text-red-600"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </Button>
          </div>
        ) : (
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
        )}

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
