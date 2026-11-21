import { cn } from "@/lib/utils"
import type { BookingStatus, PaymentStatus } from "@/types/booking"

const bookingStatusStyles: Record<BookingStatus, string> = {
  Pending: "border-amber-300 text-amber-700",
  Confirmed: "border-sky-300 text-sky-700",
  Completed: "border-sky-300 text-sky-700",
  Cancelled: "border-rose-300 text-rose-700",
}

const paymentStatusStyles: Record<PaymentStatus, string> = {
  Paid: "border-emerald-300 text-emerald-700",
  Unpaid: "border-amber-300 text-amber-700",
  Refunded: "border-slate-300 text-slate-600",
}

const badgeClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap"

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={cn(badgeClass, bookingStatusStyles[status])}>
      {status}
    </span>
  )
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={cn(badgeClass, paymentStatusStyles[status])}>
      {status}
    </span>
  )
}
