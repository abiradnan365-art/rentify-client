"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { redirect, useSearchParams } from "next/navigation"



export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    console.log("Redirecting to:", redirectTo);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { email: string; password: string }
        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })
        if (error) {
            console.error("Error signing in:", error)
        } else {
            redirect(redirectTo)
        }
        console.log("Login form data:", user)
    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
             callbackURL: redirectTo,
        });
        console.log("Google sign-in data:", data);
    }


    return (
        <div className="w-full max-w-[26rem] rounded-2xl bg-background p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-10">
            <div className="text-center">
                <h1 className="text-[26px] leading-tight font-black tracking-tight">
                    Welcome to RENTIFY
                </h1>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    Sign in to access your rentals, listings, and JWT-protected dashboard.
                </p>
            </div>

            <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/60 p-3">
                <p className="text-center text-[11px] font-bold tracking-[0.06em] text-teal-800 uppercase">
                    Please Login Rentify
                </p>

            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
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
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-10 w-full rounded-lg border border-border bg-muted px-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/15"
                    />
                </div>

                <button
                    type="submit"
                    className="h-10 w-full rounded-lg bg-teal-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:ring-3 focus-visible:ring-teal-600/30 focus-visible:outline-none"
                >
                    Sign In
                </button>
            </form>

            <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground">
                    OR
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-background text-sm font-semibold transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-teal-600/20 focus-visible:outline-none"
            >
                <GoogleIcon />
                Continue with Google (Customer)
            </button>

            <p className="mt-5 text-center text-[13px] text-muted-foreground">
                Don&apos;t have a RENTIFY account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-teal-600 hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </div>
    )
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44a5.4 5.4 0 0 1-2.35 3.58v3h3.8c2.23-2.05 3.6-5.07 3.6-8.82z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.8-3c-1.08.72-2.45 1.16-4.13 1.16-3.17 0-5.86-2.14-6.82-5.02H1.24v3.09A12 12 0 0 0 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.18 14.23a7.2 7.2 0 0 1 0-4.46v-3.1H1.24a12 12 0 0 0 0 10.65l3.94-3.09z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.37-3.37C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.24 6.67l3.94 3.1C6.14 6.89 8.83 4.75 12 4.75z"
            />
        </svg>
    )
}
