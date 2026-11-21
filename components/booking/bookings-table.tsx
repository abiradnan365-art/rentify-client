import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/booking/booking-badges"
import { formatBookingDate } from "@/lib/bookings"
import type { Booking } from "@/types/booking"

const headClass =
  "px-4 py-3 text-left text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase"

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <caption className="sr-only">My rental bookings</caption>
        <thead className="bg-muted/50">
          <tr>
            <th className={headClass}>Equipment</th>
            <th className={headClass}>Rental Period</th>
            <th className={headClass}>Booked On</th>
            <th className={headClass}>Total</th>
            <th className={headClass}>Payment</th>
            <th className={headClass}>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t border-border/60">
              <td className="px-4 py-5 font-bold">{booking.equipmentName}</td>

              <td className="px-4 py-5 whitespace-nowrap text-muted-foreground">
                {formatBookingDate(booking.startDate)}
                <span className="mx-1.5">→</span>
                {formatBookingDate(booking.endDate)}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-muted-foreground">
                {formatBookingDate(booking.bookedAt)}
              </td>

              <td className="px-4 py-5 font-bold whitespace-nowrap text-teal-700">
                ${booking.totalAmount}
              </td>

              <td className="px-4 py-5">
                <PaymentStatusBadge status={booking.paymentStatus} />
              </td>

              <td className="px-4 py-5">
                <BookingStatusBadge status={booking.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
