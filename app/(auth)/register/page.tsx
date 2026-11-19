"use client"

import type { FormEvent } from "react"
import Link from "next/link"
import { ChevronDown, Circle } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const passwordHints = [
    "At least one uppercase letter (A-Z)",
    "At least one lowercase letter (a-z)",
    "Minimum 6 characters length",
]

function GoogleIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3A7.2 7.2 0 0 1 12 19.2a7.54 7.54 0 0 1-7.08-5.22H.92v3.1A12 12 0 0 0 12 24Z"
            />
            <path
                fill="#FBBC05"
                d="M4.92 13.98A7.2 7.2 0 0 1 4.55 12c0-.69.12-1.36.37-1.98v-3.1H.92A12 12 0 0 0 0 12c0 1.94.46 3.78 1.28 5.4l3.64-3.42Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.8c1.76 0 3.34.61 4.58 1.81l3.43-3.43C17.95 1.18 15.24 0 12 0A12 12 0 0 0 .92 6.92l4 3.1A7.54 7.54 0 0 1 12 4.8Z"
            />
        </svg>
    )
}

export default function RegisterPage() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const user = Object.fromEntries(formData.entries()) as {
            fullName: string
            email: string
            password: string
            photoUrl: string
            role: "customer" | "owner" | "admin"
        }
        console.log("Register form data:", user)
        const { data, error } = await authClient.signUp.email({
            name: user.fullName,
            email: user.email,
            password: user.password,
            image: user.photoUrl,
            role: user.role,
        })
        if (error) {
            console.error("Error signing up:", error)
        } else {
            redirect("/")
        }
    }

    return (
        <div className="w-full max-w-[26rem] rounded-2xl bg-background p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-10">
            <div className="text-center">
                <h1 className="text-[26px] leading-[1.15] font-black tracking-tight">
                    Create Your RENTIFY
                    <br />
                    Account
                </h1>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    Join RENTIFY as a Renter or Equipment Owner.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                    <label
                        htmlFor="fullName"
                        className="text-[13px] font-semibold text-foreground"
                    >
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="e.g. Tanvir Rahman"
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="text-[13px] font-semibold text-foreground"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="name@company.com"
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="photoUrl"
                        className="text-[13px] font-semibold text-foreground"
                    >
                        Photo URL 
                    </label>
                    <input
                        id="photoUrl"
                        name="photoUrl"
                        type="url"
                        placeholder="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="role"
                        className="text-[13px] font-semibold text-foreground"
                    >
                        Account Role
                    </label>
                    <div className="relative">
                        <select
                            id="role"
                            name="role"
                            defaultValue="customer"
                            className="h-10 w-full appearance-none rounded-lg border border-border bg-muted px-3.5 pr-10 text-sm outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                        >
                            <option value="customer">Customer (Rent Equipment)</option>
                            <option value="owner">Owner (List Equipment)</option>
                            <option value="admin">Admin (Platform Management)</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="password"
                        className="text-[13px] font-semibold text-foreground"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={6}
                        pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                        title="Password must contain at least one uppercase letter, one lowercase letter, and 6 characters."
                        placeholder="••••••••"
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
                    <ul className="space-y-1.5 pt-1">
                        {passwordHints.map((hint) => (
                            <li
                                key={hint}
                                className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                                <Circle className="size-2.5 shrink-0" strokeWidth={1.5} />
                                {hint}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    type="submit"
                    className="h-10 w-full rounded-lg bg-teal-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:ring-3 focus-visible:ring-teal-600/30 focus-visible:outline-none"
                >
                    Register Account
                </button>
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-border" />
                </div>
                <button
                    type="button"
                    onClick={() => console.log("Continue with Google (Customer) clicked")}
                    className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-background text-sm font-semibold transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-teal-600/20 focus-visible:outline-none"
                >
                    <GoogleIcon />
                    Continue with Google (Customer)
                </button>
            </form>

            <p className="mt-5 text-center text-[13px] text-muted-foreground">
                Already registered?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-teal-600 hover:underline"
                >
                    Login here
                </Link>
            </p>
        </div>
    )
}
