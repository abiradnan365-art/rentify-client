import { BookingCard } from "@/components/booking/booking-card"
import { BookingsTable } from "@/components/booking/bookings-table"
import type { Booking } from "@/types/booking"

// Placeholder data until bookings are loaded from the API.
const dummyBookings: Booking[] = [
  {
    _id: "booking-1",
    equipmentId: "equipment-1",
    equipmentName: "RED V-Raptor 8K VV Cinema Camera Kit",
    userId: "customer-1",
    customerName: "Sadia Rahman",
    customerEmail: "sadia.rentals@rentify.io",
    rentalType: "Daily",
    startDate: "2026-11-10",
    endDate: "2026-11-13",
    bookedAt: "2026-11-05",
    totalAmount: 840,
    paymentStatus: "Paid",
    status: "Completed",
  },
  {
    _id: "booking-2",
    equipmentId: "equipment-2",
    equipmentName: "CAT 320 GC Hydraulic Excavator",
    userId: "customer-1",
    customerName: "Sadia Rahman",
    customerEmail: "sadia.rentals@rentify.io",
    rentalType: "Daily",
    startDate: "2026-11-22",
    endDate: "2026-11-25",
    bookedAt: "2026-11-15",
    totalAmount: 1350,
    paymentStatus: "Paid",
    status: "Confirmed",
  },
  {
    _id: "booking-3",
    equipmentId: "equipment-3",
    equipmentName: "DJI Matrice 350 RTK Enterprise Drone",
    userId: "customer-1",
    customerName: "Sadia Rahman",
    customerEmail: "sadia.rentals@rentify.io",
    rentalType: "Daily",
    startDate: "2026-10-14",
    endDate: "2026-10-16",
    bookedAt: "2026-10-10",
    totalAmount: 780,
    paymentStatus: "Paid",
    status: "Completed",
  },
]

const BookingsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">
          My Rental Bookings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          History of all active and completed equipment reservations.
        </p>

        {dummyBookings.length > 0 ? (
          <>
            <div className="mt-6 hidden md:block">
              <BookingsTable bookings={dummyBookings} />
            </div>

            <div className="mt-6 space-y-3 md:hidden">
              {dummyBookings.map((booking) => (
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
