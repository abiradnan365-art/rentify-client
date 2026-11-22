import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/booking/booking-badges";
import { getBookings } from "@/lib/api/bookings";
import { formatBookingDate } from "@/lib/bookings";
import type { Booking } from "@/types/booking";

export default async function OwnerRentalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");

  const bookings = (await getBookings(`ownerId=${user.id}`)) as Booking[];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">
          My Equipment Rental
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customers who have rented your equipment.
        </p>

        {bookings.length > 0 ? (
          <div className="mt-6 space-y-3">
            {bookings.map((b) => (
              <article
                key={b._id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">{b.equipmentName}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {b.customerName} · {b.customerEmail}
                    </p>
                  </div>
                  <BookingStatusBadge status={b.status} />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {formatBookingDate(b.startDate)} →{" "}
                  {formatBookingDate(b.endDate)}
                  {b.quantity ? ` · Qty ${b.quantity}` : ""}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <PaymentStatusBadge status={b.paymentStatus} />
                  <span className="text-sm font-bold text-teal-700">
                    ${b.totalAmount}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No one has rented your equipment yet.
          </p>
        )}
      </section>
    </div>
  );
}