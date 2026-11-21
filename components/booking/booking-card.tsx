import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/booking/booking-badges"
import { formatBookingDate } from "@/lib/bookings"
import type { Booking } from "@/types/booking"


export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <article className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold">{booking.equipmentName}</h3>
        <BookingStatusBadge status={booking.status} />
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {formatBookingDate(booking.startDate)}
        <span className="mx-1.5">→</span>
        {formatBookingDate(booking.endDate)}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          Booked {formatBookingDate(booking.bookedAt)}
        </span>
        <span className="text-sm font-bold text-teal-700">
          ${booking.totalAmount}
        </span>
      </div>

      <div className="mt-2">
        <PaymentStatusBadge status={booking.paymentStatus} />
      </div>
    </article>
  )
}
