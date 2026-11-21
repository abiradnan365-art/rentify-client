import type { RentalType } from "@/types/equipment"

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/** Number of billed rental units between two dates (always at least one). */
export function getRentalDuration(
  start: Date,
  end: Date,
  rentalType: RentalType
): number {
  const elapsed = end.getTime() - start.getTime()

  if (!Number.isFinite(elapsed) || elapsed <= 0) {
    return 0
  }

  if (rentalType === "Hourly") {
    return Math.max(1, Math.ceil(elapsed / HOUR_MS))
  }

  if (rentalType === "Daily") {
    return Math.max(1, Math.ceil(elapsed / DAY_MS))
  }

  if (rentalType === "Weekly") {
    return Math.max(1, Math.ceil(elapsed / (7 * DAY_MS)))
  }

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    (end.getDate() > start.getDate() ? 1 : 0)

  return Math.max(1, months)
}

export function getRentalUnitLabel(
  rentalType: RentalType,
  duration: number
): string {
  const labels: Record<RentalType, [string, string]> = {
    Hourly: ["hour", "hours"],
    Daily: ["day", "days"],
    Weekly: ["week", "weeks"],
    Monthly: ["month", "months"],
  }

  return labels[rentalType][duration === 1 ? 0 : 1]
}

/** Formats a stored booking date for display as YYYY-MM-DD. */
export function formatBookingDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toISOString().slice(0, 10)
}
