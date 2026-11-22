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
  ownerId?: string
  customerName: string
  customerEmail: string
  contactNumber?: string
  deliveryAddress?: string
  notes?: string
  rentalType: RentalType
  startDate: string
  endDate: string
  bookedAt: string
  quantity?: number
  totalDays?: number
  totalAmount: number
  stripeSessionId?: string
  paymentStatus: PaymentStatus
  status: BookingStatus
}

export type NewBooking = Omit<Booking, "_id" | "bookedAt"> & {
  bookedAt?: string
}
