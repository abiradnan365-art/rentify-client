import { BookingCard } from "@/components/booking/booking-card"
import { BookingsTable } from "@/components/booking/bookings-table"
import { getBookings } from "@/lib/api/bookings";
import type { Booking } from "@/types/booking"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"




const BookingsPage = async() => {

     const session = await auth.api.getSession({
        headers: await headers()
    })

    const bookings = (await getBookings(`customerId=${session?.user?.id}`)) as Booking[];
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">
          My Rental Bookings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          History of all active and completed equipment reservations.
        </p>

        {bookings.length > 0 ? (
          <>
            <div className="mt-6 hidden md:block">
              <BookingsTable bookings={bookings} />
            </div>

            <div className="mt-6 space-y-3 md:hidden">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            You have not booked any equipment yet.
          </p>
        )}
      </section>
    </div>
  )
}

export default BookingsPage
