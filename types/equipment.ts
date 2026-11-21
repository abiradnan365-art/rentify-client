/**
 * Shared equipment domain types.
 * The option arrays are the single source of truth for form selects and lists.
 */

export const EQUIPMENT_CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics & Technology",
  "Medical Equipment",
  "Industrial Equipment",
  "Sports & Fitness Equipment",
  "Musical Instruments",
  "Camping & Outdoor Equipment",
  "Tools & Machinery",
  "Party & Event Supplies",
  "Event & AV Equipment",
] as const

export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number]

export const RENTAL_TYPES = ["Hourly", "Daily", "Weekly", "Monthly"] as const

export type RentalType = (typeof RENTAL_TYPES)[number]

export type EquipmentStatus = "Approved" | "Pending"

export type Equipment = {
  _id: string
  name: string
  category: EquipmentCategory
  rentalPrice: number
  rentalType: RentalType
  quantity: number
  status: EquipmentStatus
}

export type UploadedImage = {
  id: string
  name: string
  url: string
}
