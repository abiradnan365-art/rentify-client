import type { RentalType } from "@/types/equipment"

export const BOOKING_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const

export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export const PAYMENT_STATUSES = ["Unpaid", "Paid", "Refunded"] as const

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

export type Booking = {
  _id: string
  equipmentId: string
  equipmentName: string
  equipmentImage?: string
  userId: string
  customerName: string
  customerEmail: string
  rentalType: RentalType
  startDate: string
  endDate: string
  bookedAt: string
  totalAmount: number
  paymentStatus: PaymentStatus
  status: BookingStatus
}

export type NewBooking = Omit<Booking, "_id" | "bookedAt"> & {
  bookedAt?: string
}
