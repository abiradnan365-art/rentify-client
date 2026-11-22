import { requireAdmin } from "@/lib/admin";
import { getAllBookings } from "@/lib/api/admin";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/booking/booking-badges";
import { formatBookingDate } from "@/lib/bookings";

export default async function AdminRentalsPage() {
  await requireAdmin();
  const bookings = await getAllBookings();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">All Rentals</h1>
        <p className="mt-1 text-sm text-muted-foreground">{bookings.length} bookings in total</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <th className="px-3 py-3">Equipment</th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Period</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Payment</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-border">
                  <td className="px-3 py-4 font-bold">{b.equipmentName}</td>
                  <td className="px-3 py-4">
                    <p>{b.customerName}</p>
                    <p className="text-xs text-muted-foreground">{b.customerEmail}</p>
                  </td>
                  <td className="px-3 py-4 text-muted-foreground">
                    {formatBookingDate(b.startDate)} → {formatBookingDate(b.endDate)}
                  </td>
                  <td className="px-3 py-4 font-bold text-teal-700">${b.totalAmount}</td>
                  <td className="px-3 py-4"><PaymentStatusBadge status={b.paymentStatus} /></td>
                  <td className="px-3 py-4"><BookingStatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}