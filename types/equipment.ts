/**
 * Shared equipment domain types.
 * The option arrays are the single source of truth for form selects and lists.
 */

export const EQUIPMENT_CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Event & AV Equipment",
] as const

export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number]

export const RENTAL_TYPES = ["Hourly", "Daily", "Weekly", "Monthly"] as const

export type RentalType = (typeof RENTAL_TYPES)[number]

export type EquipmentStatus = "Approved" | "Pending"

export type Equipment = {
  _id: string
  name: string
  // The API can hold categories beyond the form presets.
  category: string
  brand?: string
  model?: string
  rentalPrice: number
  rentalType: RentalType
  location?: string
  quantity: number
  condition?: string
  description?: string
  rentalTerms?: string
  images?: string[]
  status: EquipmentStatus
  createdAt?: string
}

export type UploadedImage = {
  id: string
  name: string
  url: string
}
